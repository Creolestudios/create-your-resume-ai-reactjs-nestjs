import React from 'react';
import './css/mobilePage.scss';
import sloth2 from '../components/login/images/sloth (2) 1.svg';

function MobilePage() {
  return (
    <>
      <div className='main-wrapper'>
        <h1 className='mobileHeading'>
          Welcome to <br />
          LAZY RESUMES.COM
        </h1>

        <p className='mobileStatic'>
          It looks like you're using your phone... <br /> This means one of two
          things:
        </p>

        <div className='staticPara'>
          <p>
            <span>
              <img src={sloth2} alt='' className='sloth2img' />
            </span>
            You're too lazy to use your computer
          </p>
          <p>
            <span>
              <img src={sloth2} alt='' className='sloth2img' />
            </span>
            We're too lazy to build a mobile version
          </p>
        </div>

        <div className='sunLogoMobile'>
          {/* <img src={sloth1} alt='' className='sloth1img' /> */}
        </div>
      </div>
    </>
  );
}

export default MobilePage;
