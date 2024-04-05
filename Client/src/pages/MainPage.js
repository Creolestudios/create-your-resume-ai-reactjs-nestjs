import React, { useState, useEffect, createContext, useRef } from 'react';
import './css/mainPage.scss';
import axios from 'axios';
import { Col, Row } from 'antd';
import Stepper from '../components/stepper/Stepper';
import UploadRightside from '../components/upload/UploadRightside';
import TailorRightside from '../components/tailor/TailorRightside';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import gif from '../components/tailor/logo.gif';
import DownloadRightSide from '../components/download/DownloadRightSide';
import DownloadLoader from '../components/loader/DownloadLoader';

export const PdfContext = createContext();
function MainPage() {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [currentStep, setCurrentStep] = useState(0);
  // const [stepperStep, setStepperStep] = useState(0);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [updatedPdf, setUpdatedPdf] = useState(null);
  const noRender = useRef(false);
  const [changedFile, setChangedFile] = useState(null);
  const [checkNew, setCheckNew] = useState(false);
  const [resumeFetched, setResumeFetched] = useState(false);
  const [tailor, setTailor] = useState(null);
  const [file, setFile] = useState(null);
  const [tryAgain, setTryAgain] = useState(null);
  const [templateSelected, setTemplateSelected] = useState(false);
  const [tailorTemplateSelected, setTailorTemplateSelected] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleStepChange = (step) => {
    setCurrentStep(step);
    // console.log(tailorAcknowledge === 'tailored');
    // console.log('handle step change .......');
    // console.log('tailorAcknowledge:', tailorAcknowledge);

    // // set stepper step
    // if (tailorAcknowledge !== 'tailored') {
    //   setStepperStep(step);
    // }
  };

  // render right side component according to the left side component
  const renderRightSideComponent = () => {
    if (currentStep === 0) {
      return <UploadRightside />;
    } else if (currentStep === 1) {
      if (resumeFetched == true) {
        return (
          <TailorRightside
            resumeData={resumeData}
            resumeFetched={resumeFetched}
            tailorTemplateSelected={tailorTemplateSelected}
          />
        );
      }
    } else if (currentStep === 2) {
      if (downloadLoading) {
        return <DownloadLoader />;
      } else {
        return (
          <DownloadRightSide
            resumeData={file}
            tryAgain={tryAgain}
            templateSelected={templateSelected}
          />
        );
      }
    }
    return null; // Handle additional steps if needed
  };

  // Check if resume already exist or not
  const checkResumeExists = async () => {
    setLoading(true);

    try {
      setResumeData(gif);
      const response = await axios.get(
        server_url + '/lazyresume/getexistresume',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // If resume found then redirect directly to first step
      if (response.data.file) {
        setLoading(false);
        setCurrentStep(1);
        // setStepperStep(1);
        setResumeData(response.data.file);
        setResumeFetched(true);

        sessionStorage.setItem('currentStep', 1);
      } else {
        setCheckNew(true);
      }
      setLoading(false);
    } catch (error) {
      // message.error(`No Resume Found`);
      setLoading(false);
      setResumeData(gif);
    }
  };

  // fetch token from url and set to localstorage
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const jwtToken = params.get('query');

    if (jwtToken) {
      localStorage.setItem('accessToken', jwtToken);
    }
  }, [location.search, navigate]);

  // check if user is signin or not
  useEffect(() => {
    if (!accessToken) {
      navigate('/signin');
    } else if (
      (currentStep === 1 && changedFile === 'file') ||
      (currentStep === 1 && tailor === 'tailor')
    ) {
      checkResumeExists();
    } else if (currentStep === 0) {
      if (!noRender.current) {
        checkResumeExists();
        noRender.current = true;
      }
    }
  }, [changedFile, currentStep]);

  useEffect(() => {
    setFile(updatedPdf);
  }, [updatedPdf, tryAgain]);

  // useEffect(() => {
  //   // // set stepper step
  //   if (tailorAcknowledge === 'tailored') {
  //     console.log('goes in if');
  //     setStepperStep(1);
  //   }
  // }, [tailorAcknowledge]);

  return (
    <>
      <PdfContext.Provider value={{ updatedPdf, setUpdatedPdf }}>
        <Row className='row'>
          {loading && <Loader />}
          <Col span={12} className='column1'>
            {/* Leftside component */}
            <Stepper
              // setTailorAcknowledge={setTailorAcknowledge}
              onStepChange={handleStepChange}
              currentStep={currentStep}
              resumeData={resumeData}
              setChangedFile={setChangedFile}
              checkNew={checkNew}
              resumeFetched={resumeFetched}
              setResumeFetched={setResumeFetched}
              setTailor={setTailor}
              setTryAgain={setTryAgain}
              setTemplateSelected={setTemplateSelected}
              setTailorTemplateSelected={setTailorTemplateSelected}
              setDownloadLoading={setDownloadLoading}
            />
          </Col>
          <Col span={12} className='column2'>
            {/* Render right side component according to leftside component */}
            {renderRightSideComponent()}
          </Col>
        </Row>
      </PdfContext.Provider>
    </>
  );
}

export default MainPage;
