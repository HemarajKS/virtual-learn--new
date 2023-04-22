import './onboarding.css';
import { Slide } from 'react-slideshow-image';
import { onboardingLogo, virtualLearn_logo } from '../../utils/svgIcons';
import { Outlet, useNavigate } from 'react-router-dom';
import WelcomeScreen from '../../components/onboarding/welcome/welcome';
import LoginVerfication from '../../components/onboarding/login/login-verification/login-otp/LoginOtp';
import LoginPassword from '../../components/onboarding/login/login-verification/login-password/LoginPassword';
import LoginAuth from '../../components/onboarding/login/login-auth/LoginAuth';
import LoginForgotPW from '../../components/onboarding/login/login-forgotPW/LoginForgotPW';
import PersonalDetails from '../../components/onboarding/registration/personal-details/PersonalDetails';
import RegistrationForm from '../../components/onboarding/registration/registrationform/RegistrationForm';

const Onboarding = () => {
  const navigate = useNavigate();
  const indicators = () => <div className="indicator"></div>;
  return (
    <div className="onboarding">
      <div className="onboarding-entryMessage">
        <div className="onboarding-entryMessageSlider">
          {' '}
          <Slide indicators={indicators}>
            <div className="each-slide">
              <div className="onboarding-entryMessageimage">
                <img
                  src={require('../../assets/images/initial1.png')}
                  alt="Learner Engagement"
                />
              </div>
              <div className="onboarding-entryMessageTitle">
                Learner Engagement
              </div>
              <div className="onboarding-entryMessageBody">
                Interactive features mirror the traditional classroom experience
                and learners receive feedback to increase long-term retention,
                tripling learning efficacy over standard video.
              </div>
            </div>
            <div className="each-slide">
              <div className="onboarding-entryMessageimage">
                <img
                  src={require('../../assets/images/initial2.png')}
                  alt=" Accountable Tracking"
                />
              </div>
              <div className="onboarding-entryMessageTitle">
                Accountable Tracking
              </div>
              <div className="onboarding-entryMessageBody">
                Receive immediate, accessible data (both performance and
                behavior-based) to effectively remediate concepts, automatically
                assign grades, and address deficiencies.
              </div>
            </div>
            <div className="each-slide">
              <div className="onboarding-entryMessageimage">
                <img
                  src={require('../../assets/images/initial3.png')}
                  alt="Seamless Workflow"
                />
              </div>
              <div className="onboarding-entryMessageTitle">
                Seamless Workflow
              </div>
              <div className="onboarding-entryMessageBody">
                Sync rosters, create and assign impactful video experiences,
                enrich your flipped classroom, and streamline tedious grading.
              </div>
            </div>
          </Slide>
        </div>
      </div>
      <div className="onboarding-detailsContainer">
        <div
          className="onboarding-detailsLogo"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/');
          }}
        >
          {onboardingLogo}
        </div>

        <div className="onboarding-detailsBody">
          {/* <WelcomeScreen /> */}
          {/* <LoginVerfication/> */}
          {/* <RegistrationForm/>  */}
          {/* <LoginAuth /> */}
          {/* <LoginForgotPW /> */}
          {/* <LoginPassword/>  */}
          {/* <PersonalDetails/> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
