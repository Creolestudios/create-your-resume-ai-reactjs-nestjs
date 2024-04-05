import React, { useState, useEffect } from 'react';
import './css/tailor.scss';
import { Input, Form, Button, message, Upload } from 'antd';
import axios from 'axios';
// import { PdfContext } from '../../pages/MainPage';
import Loader from '../loader/Loader';
import resume1 from '../download/images/Resume1.png';
import resume2 from '../download/images/Resume2.png';
import resume3 from '../download/images/Resume3.png';

function Tailor({
  onNext,
  // onPrev,
  resumeData,
  checkNew,
  setChangedFile,
  setTemplateSelected,
  setTemplateNumber,
  setTailorTemplateSelected,
}) {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const { TextArea } = Input;
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const [resumeExists, setResumeExists] = useState(false);
  const [descDone, setDescDone] = useState(false);

  // const { updatedPdf, setUpdatedPdf } = useContext(PdfContext);

  const validateMessages = {
    required: '${label} is required!',
  };

  const onFinish = async (values) => {
    // setBtnLoading(true);
    setError('');

    sessionStorage.setItem('JD', values.jobdescription);
    setTemplateSelected(false);
    setTailorTemplateSelected(true);

    setDescDone(true);
    // onNext();

    // await axios
    //   .post(
    //     server_url + '/lazyresume/getnewresume',
    //     {
    //       jobdescription: values.jobdescription,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setUpdatedPdf(res.data);
    //     setBtnLoading(false);
    //     onNext();
    //   })
    //   .catch((e) => {
    //     setBtnLoading(false);
    //     setError('Error sending JD. Please, try again');
    //   });
  };

  // handle upload function
  const handleUpload = async (file) => {
    setChangedFile('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post(`${server_url}/lazyresume/uploadfile`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success(`${file.name} file uploaded successfully`);

      // Call the onNext function passed from the parent component to proceed to the next step
      setChangedFile('file');
    } catch (error) {
      message.error(`${file.name} file upload failed.`);
    }
  };

  const beforeUpload = (file) => {
    const allowedFileTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];

    const isValidFileType = allowedFileTypes.includes(file.type);
    if (!isValidFileType) {
      message.error('Please upload a .docx or .pdf file');
    }
    return isValidFileType;
  };

  const uploadProps = {
    beforeUpload,
    maxCount: 1,
    accept: '.pdf,.docx,.doc',
  };

  useEffect(() => {
    // Check if resumeData is not null or undefined, and update the resumeExists state
    if (resumeData && !checkNew) {
      setResumeExists(true);
    }
  }, [resumeData]);

  // console.log('template......', templa);

  return (
    <>
      {btnLoading && <Loader />}
      <div className='tailor-wrapper'>
        {/* if resume exist already then show welcomeback part otherwise show click number two part */}
        {resumeExists ? (
          <>
            <h1 className='tailorHeadingText'>WELCOME BACK!</h1>

            {!descDone ? (
              <p className='tailorStaticText'>
                Copy and paste the job description and requirements. <br /> Tip:
                Copy it all! from titles and skills, to 'about the company', and
                'about the role'. All of it.
              </p>
            ) : (
              <p className='tailorStaticText'>
                Almost done! Choose the right template for the job you're after:
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className='tailorHeadingText'>CLICK NUMBER TWO</h1>

            {!descDone ? (
              <p className='tailorStaticText'>
                Copy and paste the job description. <br /> Tip: Copy it all!
                from titles and skills, to 'about the company', and 'about the
                role'. All of it.
              </p>
            ) : (
              <p className='tailorStaticText'>
                Almost done! Choose the right template for the job you're after:
              </p>
            )}
          </>
        )}

        {/* Textarea part and submit buttons */}
        {!descDone && (
          <div className='textareaDiv'>
            <Form
              name='jd'
              initialValues={{
                remember: true,
              }}
              validateMessages={validateMessages}
              onFinish={onFinish}
              autoComplete='off'
            >
              <Form.Item
                required
                rules={[
                  {
                    required: true,
                    message: 'Please enter job description!',
                  },
                ]}
                wrapperCol={{
                  span: 16,
                }}
                name='jobdescription'
              >
                <TextArea rows={3} />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Tailor my resume
                </Button>

                <Upload
                  {...uploadProps}
                  showUploadList={false}
                  customRequest={({ file, onSuccess, onError }) => {
                    handleUpload(file)
                      .then(() => onSuccess())
                      .catch((err) => {
                        onError(err);
                      });
                  }}
                >
                  <Button>Upload different resume</Button>
                </Upload>
              </Form.Item>
            </Form>
            {error && <p className='errorClass'>{error}</p>}
          </div>
        )}

        {descDone && (
          <>
            <div className='showTemplates'>
              <img
                src={resume1}
                alt='Resume 1'
                className={`templates `}
                onClick={() => {
                  setTemplateNumber(1);
                  setTailorTemplateSelected(false);
                  // setTemplateSelected(false);
                  onNext();
                }}
              />
              <img
                src={resume2}
                alt='Resume 2'
                className={`templates`}
                onClick={() => {
                  setTemplateNumber(2);
                  setTailorTemplateSelected(false);
                  // setTemplateSelected(false);
                  onNext();
                }}
              />
              <img
                src={resume3}
                alt='Resume 3'
                className={`templates `}
                onClick={() => {
                  setTemplateNumber(3);
                  // setTemplateSelected(false);
                  setTailorTemplateSelected(false);
                  onNext();
                }}
              />
            </div>

            <div className='showTitle'>
              <p className='templateTitle' style={{ fontWeight: 'bold' }}>
                Standard Professional
              </p>
              <p className='templateTitle' style={{ fontWeight: 'bold' }}>
                Creative Professional
              </p>
              <p className='templateTitle' style={{ fontWeight: 'bold' }}>
                Corporate Personal
              </p>
            </div>

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
                Highlight your achievements and your passions. Stand out from
                the crowd.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Tailor;
