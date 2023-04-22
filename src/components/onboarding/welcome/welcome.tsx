import './welcome.css';
import { useNavigate } from 'react-router-dom';
import { virtualLearn_logo } from '../../../utils/svgIcons';
import OnBoardingModal from '../OnboardingModal/OnBoardingModal';
import { useState } from 'react';

const WelcomeScreen = () => {
  const [modal, setModal] = useState('');
  const navigate = useNavigate();

  const childToParent = (childData: any) => {
    setModal(childData);
  };

  return (
    <div className="welcomeScreen">
      <div className="onboarding-detailsMobileLogo">{virtualLearn_logo}</div>
      <div className="welconescreen-landingIllustration">
        <img
          src={require('../../../assets/images/img_landing_illustration.png')}
          alt="landing illustration"
        />
      </div>
      <div className="welcome-title">Welcome</div>
      <div className="welcome-text">
        Are you ready to study easily in a virtual way?
      </div>
      <div className="welcome-btns">
        <button
          className="welcome-btn"
          onClick={() => {
            navigate('login');
          }}
        >
          Login
        </button>
        Or
        <button
          className="welcome-btn"
          onClick={() => {
            navigate('register');
          }}
        >
          Register
        </button>
      </div>
      <div className="welcome-footer">
        By creating new account, you agree to our{' '}
        <span
          className="welcome-footer-links"
          onClick={() => {
            setModal('Terms of Services');
          }}
        >
          Terms of Services
        </span>{' '}
        &{' '}
        <span
          className="welcome-footer-links"
          onClick={() => {
            setModal('Privacy Policy');
          }}
        >
          Privacy Policy
        </span>
      </div>
      {<OnBoardingModal title={modal} childToParent={childToParent} />}
    </div>
  );
};

export default WelcomeScreen;
