import React, { useState } from 'react';
import './css/googleLogin.scss';
import googlelogo from './images/google-logo.svg';
import linkedinlogo from './images/linkedin-logo.svg';

function GoogleSignin() {
  const server_url = process.env.REACT_APP_SERVER_URL;
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');

  const onchange = (e) => {
    setChecked(e.target.checked);
    setError('');
  };

  const checkTerms = () => {
    if (!checked) {
      setError('Please accept terms and conditions');
    }
  };

  return (
    <>
      <div className='googleLogin'>
        <h1 className='headingText'>
          WELCOME TO <br />
          LAZY RESUMES.COM
        </h1>

        <p className='paraText'>
          Tailor your resume to fit any job with just 3 clicks. <br />
          Oh yeah, and it's FREE.
        </p>

        <div className='loginButtons'>
          {/* <a
            href={server_url + '/auth/google'}
            className={checked ? '' : 'anchordisabled'}
          > */}
          <button
            onClick={() => {
              checked
                ? (window.location.href = server_url + '/auth/google')
                : checkTerms();
            }}
          >
            <span>
              <img src={googlelogo} alt='' />
            </span>
            Sign in with Google
          </button>
          {/* </a> */}

          {/* <a
            href={server_url + '/auth/linkedin'}
            className={checked ? '' : 'anchordisabled'}
          > */}
          <button
            onClick={() => {
              checked
                ? (window.location.href = server_url + '/auth/linkedin')
                : checkTerms();
            }}
          >
            <span>
              <img src={linkedinlogo} alt='' />
            </span>
            Sign in with LinkedIn
          </button>
          {/* </a> */}
        </div>

        <div className='terms'>
          <label htmlFor='termsCheckbox'>
            <input
              type='checkbox'
              name='terms'
              id='termsCheckbox'
              onChange={onchange}
            />
            <span>
              I agree to the terms of use. To read it, click{' '}
              <a
                href='https://lazysloths.github.io/Terms-of-Service/Terms%20of%20Service.pdf'
                target='_blank'
              >
                here
              </a>
            </span>
          </label>
        </div>
        {error && <p className='loginError'>{error}</p>}
      </div>

      <div className='loginfooter'>
        <p style={{ color: '#808080' }} id='sitecopyright'>
          &copy; LAZYRESUMES.com 2023
        </p>
      </div>
    </>
  );
}

export default GoogleSignin;
