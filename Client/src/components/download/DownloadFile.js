import React, { useState, useContext, useEffect } from 'react';
import { PdfContext } from '../../pages/MainPage';
import axios from 'axios';
import './css/download.scss';
import { Button } from 'antd';
import Loader from '../loader/Loader';
import resume1 from './images/Resume1.png';
import resume2 from './images/Resume2.png';
import resume3 from './images/Resume3.png';

function DownloadFile({
  onPrev,
  setTryAgain,
  setTemplateSelected,
  templateNumbers,
  setDownloadLoading,
}) {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState();
  const { setUpdatedPdf } = useContext(PdfContext);
  const accessToken = localStorage.getItem('accessToken');
  const [templateSelect, setTemplateSelect] = useState(false);
  const [templateNumber, setTemplateNumber] = useState(null);
  const [disableBtn, setDisableBtn] = useState(false);

  // Create a cache object to store responses
  const [responseCache, setResponseCache] = useState({});

  const downloadPDF = () => {
    setError('');
    setLoader(true);

    const templateNumber = sessionStorage.getItem('number');

    axios
      .get(
        server_url +
          `/lazyresume/downloadhtmlres/pdf/template_${templateNumber}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        const file = res.data;
        const link = document.createElement('a');
        link.href = file;
        link.target = '_blank';
        link.click(); // Simulate a click event on the link
        setLoader(false);
        setError('');
      })
      .catch((e) => {
        setError('Error downloading PDF file.');
        setLoader(false);
      });
  };

  const downloadDoc = () => {
    setError('');
    setLoader(true);
    const templateNumber = sessionStorage.getItem('number');

    axios
      .get(
        server_url +
          `/lazyresume/downloadhtmlres/doc/template_${templateNumber}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        const file = res.data;
        const link = document.createElement('a');
        link.href = file;
        link.target = '_blank';
        link.click(); // Simulate a click event on the link
        setLoader(false);
      })
      .catch((e) => {
        setError('Error downloading DOCX file.');
        setLoader(false);
      });
  };

  const selectedTemplate = async (number) => {
    const JD = sessionStorage.getItem('JD');
    sessionStorage.setItem('number', number);
    setDisableBtn(true);
    setError('');
    // setLoader(true);
    setDownloadLoading(true);
    setTryAgain(null);

    // Check if the response is already cache
    if (responseCache[number]) {
      setUpdatedPdf(responseCache[number]);
      setTryAgain('tried again');
      // setLoader(false);
      setDownloadLoading(false);
      setDisableBtn(false);
      setTemplateSelected(true);
    } else {
      await axios
        .post(
          server_url + '/lazyresume/getresume',
          {
            jobdescription: JD,
            template: `template_${number}`,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          // Cache the response
          setResponseCache({ ...responseCache, [number]: res.data });
          setUpdatedPdf(res.data);
          setTryAgain('tried again');
          // setLoader(false);
          setDownloadLoading(false);
          setDisableBtn(false);
          setTemplateSelected(true);
          setTemplateSelect(true);
        })
        .catch((e) => {
          setError('Error sending JD. Please, try again');
          // setLoader(false);
          setDownloadLoading(false);
          setDisableBtn(false);
        });
    }
  };

  const tryAgain = async () => {
    const JD = sessionStorage.getItem('JD');
    const templateNumber = sessionStorage.getItem('number');
    setError('');
    // setLoader(true);
    setDisableBtn(false);
    setDownloadLoading(true);
    setTryAgain(null);

    await axios
      .post(
        server_url + '/lazyresume/getresume',
        {
          jobdescription: JD,
          template: `template_${templateNumber}`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setUpdatedPdf(res.data);
        setTryAgain('tried again');
        // setLoader(false);
        setDisableBtn(false);
        setDownloadLoading(false);
      })
      .catch((e) => {
        setError('Error sending JD. Please, try again');
        // setLoader(false);
        setDisableBtn(false);
        setDownloadLoading(false);
      });
  };

  useEffect(() => {
    setTemplateNumber(templateNumbers);
    selectedTemplate(templateNumbers);
  }, [templateNumbers]);

  return (
    <>
      <div className='download-wrapper'>
        {loader && <Loader />}
        <h1 className='downloadHeadingText'>CLICK NUMBER THREE</h1>

        {templateSelect ? (
          <p className='downloadStaticText'>
            Done. Now it's your time to shine. Go ahead and apply with
            confidence. <br />
            You got this!
          </p>
        ) : (
          <p className='downloadStaticText'>
            Almost done! Choose the right template for the job you're after:
          </p>
        )}

        <div className='showTemplates'>
          <img
            src={resume1}
            alt='Resume 1'
            className={`templates ${templateNumber === 1 ? 'selected' : ''}`}
            onClick={() => {
              if (!disableBtn) {
                selectedTemplate(1);
                setTemplateNumber(1);
              }
            }}
            style={{
              opacity:
                templateNumber !== null ? (templateNumber !== 1 ? 0.5 : 1) : 1,
            }}
          />
          <img
            src={resume2}
            alt='Resume 2'
            className={`templates ${templateNumber === 2 ? 'selected' : ''}`}
            onClick={() => {
              if (!disableBtn) {
                selectedTemplate(2);
                setTemplateNumber(2);
              }
            }}
            style={{
              opacity:
                templateNumber !== null ? (templateNumber !== 2 ? 0.5 : 1) : 1,
            }}
          />
          <img
            src={resume3}
            alt='Resume 3'
            className={`templates ${templateNumber === 3 ? 'selected' : ''}`}
            onClick={() => {
              if (!disableBtn) {
                selectedTemplate(3);
                setTemplateNumber(3);
              }
            }}
            style={{
              opacity:
                templateNumber !== null ? (templateNumber !== 3 ? 0.5 : 1) : 1,
            }}
          />
        </div>

        <div className='showTitle'>
          <p className='templateTitle'>Standard Professional</p>
          <p className='templateTitle'>Creative Professional</p>
          <p className='templateTitle'>Corporate Personal</p>
        </div>

        {/* {!templateSelect && (
          <div className='showTitle tempDesc'>
            <p className='templateTitle'>
              Make life easier for your recruiter. Key information is easily
              identifiable. Perfect for Engineers, Analysts, Finance.
            </p>
            <p className='templateTitle '>
              Perfect for the designers, product managers, project managers,
              marketing, etc.
            </p>
            <p className='templateTitle'>
              Highlight your achievements and your passions. Stand out from the
              crowd.
            </p>
          </div>
        )} */}

        {/* {templateSelect && (
          <> */}
        <div className='downloadReady'>
          <Button onClick={downloadPDF} disabled={disableBtn}>
            Download as PDF
          </Button>
          <Button onClick={downloadDoc} disabled={disableBtn}>
            Download as DOCX
          </Button>
        </div>

        <p className='orText'>Not happy with the result?</p>

        <div className='tryagain'>
          <Button onClick={tryAgain} disabled={disableBtn}>
            Let's try again
          </Button>
        </div>

        {error && <p className='errorClass'>{error}</p>}
        {/* </>
        )} */}
      </div>

      {/* <div className='share'>
        <p>Don't forget to share!</p>
        <div className='imglogo'>
          <img src={sloth3} alt='images' style={{ marginLeft: '-20px' }} />
        </div>
      </div> */}
    </>
  );
}

export default DownloadFile;
