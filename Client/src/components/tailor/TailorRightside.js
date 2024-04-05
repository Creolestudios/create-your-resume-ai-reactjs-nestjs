import React, { useEffect, useState } from 'react';
import './css/tailorrightside.scss';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import sloth1 from '../login/images/sloth 1.svg';
import '../upload/css/rightside.scss';
import sloth2 from '../download/images/Group_5.svg';

function TailorRightside({
  resumeData,
  resumeFetched,
  tryAgain,
  tailorTemplateSelected,
}) {
  const [resData, setresData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateURL = (url) => {
    try {
      new URL(url);
      setError('');
      return true;
    } catch (error) {
      // setError('Invalid URL');
      setTimeout(() => setLoading(false), 1000);
      return false;
    }
  };

  useEffect(() => {
    if (validateURL(resumeData)) {
      setresData(resumeData);
      setLoading(true);
      setTimeout(() => setLoading(false), 1000);
    }
  }, [resumeData, tryAgain]);

  return (
    <>
      {!tailorTemplateSelected && (
        <div className='pdfViewer'>
          {error && <p className='errorClass'>{error}</p>}

          {/* Load pdf using react-doc-viewer */}
          <>
            {loading ? (
              <div className='sunLogo'>
                <img src={sloth1} className='sloth1' alt='Loading........' />
              </div>
            ) : (
              <DocViewer
                config={{
                  pdfVerticalScrollByDefault: true,
                  pdfZoom: {
                    defaultZoom: 1, // 1 as default,
                    zoomJump: 0.1, // 0.1 as default,
                  },
                }}
                documents={[
                  {
                    uri: resData ? resData : require('./logo.gif'),
                    options: { sandbox: 'allow-scripts' },
                  },
                ]}
                pluginRenderers={DocViewerRenderers}
              />
            )}
          </>
        </div>
      )}

      {tailorTemplateSelected && (
        <div className='sloth-img'>
          <p>Don't mind me, I'm just hanging around.</p>

          <img src={sloth2} alt='image' />
        </div>
      )}
    </>
  );
}

export default TailorRightside;
