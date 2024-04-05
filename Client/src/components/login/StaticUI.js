import React from 'react';
import './css/staticUI.scss';
import sloth2 from './images/sloth (2) 1.svg';
import sloth1 from './images/sloth 1.svg';

function StaticUI() {
  return (
    <div className='staticUI'>
      <h1 className='staticHeadingText'>LAZY RESUMES.COM</h1>

      <div className='staticText'>
        <p>
          <span>
            <img src={sloth2} alt='' className='sloth2' />
          </span>
          Upload your resume
        </p>
        <p>
          <span>
            <img src={sloth2} alt='' className='sloth2' />
          </span>
          Paste in the Job Description you're after
        </p>
        <p>
          <span>
            <img src={sloth2} alt='' className='sloth2' />
          </span>
          Download the new resume, and apply!
        </p>
      </div>

      <div className='sunLogo'>
        <img src={sloth1} alt='' className='sloth1' />
      </div>
    </div>
  );
}

export default StaticUI;
