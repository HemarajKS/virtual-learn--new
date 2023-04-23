import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { closeIcon } from '../../../utils/svgIcons';

const OnBoardingModal = (props: any) => {
  const [data, setdata] = useState('');
  useEffect(() => {
    axios
      .get(
        `
https://virtual-learn-backend.onrender.com/misc/${
          props.title === 'Privacy Policy' ? 'privacyPolicy' : 'termsOfService'
        }`
      )
      .then((response) => {
        response && response.data && setdata(response.data[1]);
      });
  }, [props]);

  return (
    <>
      {props.title !== '' && (
        <aside
          className="headerSearch-filterModal"
          style={{
            alignItems: 'center',
            marginTop: 'unset',
          }}
          onClick={(e) => {
            props.childToParent('');
          }}
        >
          <div
            className="headerSearch-filterActualModal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="headerSearch-filterModalBody">
              <div
                className="headerSearch-filterModalBodyTitle"
                style={{ fontSize: '24px' }}
              >
                {props.title}
                <div
                  className="headerSearch-filterModalBodyCloseIcon"
                  onClick={(e) => {
                    props.childToParent('');
                  }}
                >
                  {closeIcon}
                </div>
              </div>
              <div className="quizModal-text" style={{ textAlign: 'justify' }}>
                {/* {data} */}
                <div dangerouslySetInnerHTML={{ __html: data }} />
              </div>

              <div className="headerSearch-filterModalButtons"></div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default OnBoardingModal;
