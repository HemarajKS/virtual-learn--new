import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { closeIcon } from '../../../utils/svgIcons';

const OnBoardingModal = (props: any) => {
  const [data, setdata] = useState('');
  useEffect(() => {
    axios
      .get(
        `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/${
          props.title === 'Privacy Policy'
            ? 'privacyPolicy'
            : 'termsAndConditions'
        }`
      )
      .then((response) => {
        response &&
          response.data &&
          response.data.message &&
          setdata(response.data.message);
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
                {data}
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
