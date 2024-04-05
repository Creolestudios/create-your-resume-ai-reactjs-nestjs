import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import customlogo from '../login/images/sloth (2) 1.svg';
import './css/stepper.scss';
import UploadCmp from '../upload/UploadCmp';
import arrow from './images/Arrow1.svg';
import Tailor from '../tailor/Tailor';
import DownloadFile from '../download/DownloadFile';
import { useNavigate } from 'react-router-dom';

function Stepper({
  onStepChange,
  currentStep,
  resumeData,
  setChangedFile,
  checkNew,
  resumeFetched,
  setResumeFetched,
  tailor,
  setTailor,
  setTryAgain,
  setTemplateSelected,
  setTailorTemplateSelected,
  setDownloadLoading,
  // setStepperStep,
  // stepperStep,
  // setTailorAcknowledge,
}) {
  const navigate = useNavigate();
  const [uploadResume, setUploadResume] = useState(false);
  const [templateNumbers, setTemplateNumber] = useState(null);

  // onNext and onPrev functions
  const next = () => {
    onStepChange(currentStep + 1); // Notify parent component of the step change

    sessionStorage.setItem('currentStep', currentStep + 1);
  };
  const prev = () => {
    onStepChange(currentStep - 1); // Notify parent component of the step change

    sessionStorage.setItem('currentStep', currentStep - 1);
    setUploadResume(true);
  };

  // 3 steps of stepper
  const steps = [
    {
      title: 'Upload',
      content: (
        <UploadCmp
          onNext={next}
          uploadResume={uploadResume}
          setChangedFile={setChangedFile}
          resumeFetched={resumeFetched}
          setResumeFetched={setResumeFetched}
          setTailor={setTailor}
        />
      ),
    },
    {
      title: 'Tailor',
      content: (
        <Tailor
          onNext={next}
          onPrev={prev}
          resumeData={resumeData}
          checkNew={checkNew}
          tailor={tailor}
          setChangedFile={setChangedFile}
          setTemplateSelected={setTemplateSelected}
          setTemplateNumber={setTemplateNumber}
          // setStepperStep={setStepperStep}
          // setTailorAcknowledge={setTailorAcknowledge}
          setTailorTemplateSelected={setTailorTemplateSelected}
        />
      ),
    },
    {
      title: 'Download',
      content: (
        <DownloadFile
          onPrev={prev}
          setTryAgain={setTryAgain}
          setTemplateSelected={setTemplateSelected}
          templateNumbers={templateNumbers}
          setDownloadLoading={setDownloadLoading}
          // setStepperStep={setStepperStep}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  // Custom dot UI and visited or not UI
  const customDot = (dot, { status, index }) => {
    const isVisited = status === 'finish';
    const isCurrent = status === 'process';
    const logoStyle = isVisited ? { opacity: '0.5' } : {};

    return (
      <div className={`customDotContainer ${isVisited ? 'visited' : ''}`}>
        {isVisited || isCurrent ? (
          <img
            src={customlogo}
            alt='Custom Logo'
            className='customDotLogo'
            style={logoStyle}
          />
        ) : (
          <span className='customDotNumber'>{index + 1}</span>
        )}
      </div>
    );
  };

  // Logout button functionality
  const logoutAccount = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/signin');
  };

  useEffect(() => {
    const savedStep = sessionStorage.getItem('currentStep');
    if (savedStep) {
      onStepChange(parseInt(savedStep));
    }
  }, []);

  // console.log('stepper step', stepperStep);

  return (
    <>
      <div className='prevnext'>
        {/* if current step is 0 then show logout button and if greater than 0 then show prev button */}
        {currentStep > 0 && (
          <p
            onClick={() => {
              // setTailorAcknowledge('');
              prev();
            }}
            className='nextBtn'
          >
            <span>
              <img src={arrow} alt='' />
            </span>
            Back
          </p>
        )}

        {currentStep === 0 && (
          <p className='nextBtn' onClick={logoutAccount}>
            <span>
              <img src={arrow} alt='' />
            </span>
            Logout
          </p>
        )}
      </div>

      {/* Stepper UI */}
      <Steps
        current={currentStep}
        items={items}
        className='progressBar'
        progressDot={customDot}
      />

      {/* Middle content according to steps */}
      <div
        className={`contentStyle ${currentStep === 1 ? 'middle-content' : ''}`}
      >
        {steps[currentStep].content}
      </div>

      {/* Footer content */}
      <div className='footer'>
        <p style={{ color: '#808080' }} id='copyright'>
          &copy; LAZYRESUMES.com 2023
        </p>
        <p style={{ color: '#808080' }} id='terms'>
          For terms of use and privacy policy click{' '}
          <a
            href='https://lazysloths.github.io/Terms-of-Service/Terms%20of%20Service.pdf'
            target='_blank'
            rel='noreferrer'
          >
            here
          </a>
        </p>
      </div>
    </>
  );
}

export default Stepper;
