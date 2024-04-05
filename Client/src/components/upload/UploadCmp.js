import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/upload.scss';
import { Button, message, Upload } from 'antd';

function UploadCmp({
  onNext,
  uploadResume,
  setChangedFile,
  resumeFetched,
  setResumeFetched,
  setTailor,
}) {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [resumeExists, setResumeExists] = useState(false);
  const [error, setError] = useState('');
  const [resFetched, setResFetched] = useState(resumeFetched);
  const accessToken = localStorage.getItem('accessToken');

  const handleUpload = async (file) => {
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
      onNext();
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
    setResumeFetched(false);
    if (uploadResume) {
      setResumeExists(uploadResume);
    }
  }, []);

  return (
    <div className='upload-wrapper'>
      <h1 className='uploadHeadingText'>CLICK NUMBER ONE</h1>

      {!resumeExists ? (
        <div className='upload'>
          <Upload
            {...uploadProps}
            customRequest={({ file, onSuccess, onError }) => {
              handleUpload(file)
                .then(() => onSuccess())
                .catch((err) => {
                  onError(err);
                });
            }}
          >
            <Button>Upload Your Resume</Button>
          </Upload>
        </div>
      ) : (
        <>
          <p className='returnPara'>
            We've got your resume! <br /> But you can always upload a new one
          </p>
          <div className='againUpload'>
            <Button
              onClick={() => {
                setTailor('tailor');
                onNext();
              }}
            >
              Tailor my resume
            </Button>
            <Upload
              {...uploadProps}
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
          </div>
        </>
      )}
      <p className='acceptingTerms'>We Accept Both .PDF and .DOCX Files</p>
      {error && <p className='errorclass'>{error}</p>}
    </div>
  );
}

export default UploadCmp;
