import '../registrationform/RegistrationForm.css';
import '../../../onboarding/login/login-auth/LoginAuth.css';
import * as yup from 'yup';
import 'yup-phone';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerOtp } from '../../../../redux/reducers/Conditions';
import { useNavigate } from 'react-router-dom';
import { mobileBackBtn } from '../../../../utils/svgIcons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { facebook, google } from '../../../../utils/svg';
import Loading from '../../../../utils/loading/Loading';

const RegistrationForm = () => {
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [mobileNum, setMobileNum] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const phoneSchema = yup.string().phone().required();
  const phoneNumValidation = (e) => {
    setMobileNum(e.target.value);
    (async () => {
      setInvalidPhone(await phoneSchema.isValid(e.target.value)); // → true
    })();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const mobileNum = e.target.mobileNum.value;
    // dispatch(otpPage(true));
    // navigate('/onboarding/otpVerification');
    mobileReg(mobileNum);
  };

  const mobileReg = (mobileNum) => {
    setLoading(true);
    fetch(
      'http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/newUser/continue',
      {
        method: 'put',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber: mobileNum }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        console.log('response', res);
        if (res.message === 'OTP Valid For 2 Minutes') {
          dispatch(registerOtp(true));
          navigate('/onboarding/registerOtp');
          sessionStorage.setItem('regMobileNum', mobileNum);
        } else if (res.message === 'Please Enter Valid Phone Number') {
          dispatch(registerOtp(false));
          showError(res.message);
        } else {
          dispatch(registerOtp(false));
          showError(res.message);
        }
      })
      .catch((err) => {
        alert('some error occured');
        setLoading(false);
      });
  };

  const showError = (msg) => {
    toast(
      <div className="loginAuth-showError">
        <div className="loginAuth-showErrorIcon">
          <img
            src={require('../../../../assets/icons/icn_invalid error.png')}
            alt="invalid"
          />
        </div>
        <div className="loginAuth-showErrorMessage">{msg}</div>
      </div>,
      {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  return (
    <div className="loginAuth">
      <div className="loginAuth-backButton">
        <div
          onClick={() => {
            navigate('login');
          }}
          style={{ width: '28px', cursor: 'pointer' }}
        >
          {' '}
          {mobileBackBtn}
        </div>
      </div>

      <div className="loginAuth-title">New Account</div>
      <div className="loginAuth-text">
        Create a new account to get access to all courses by entering your
        mobile number.
      </div>

      <div className="loginAuth-Form">
        <form className="loginAuth-FormContainer" onSubmit={submitHandler}>
          {' '}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              className="loginAuth-formInput"
              style={{ borderBottom: '0px solid red' }}
            >
              <p>+91</p>
            </div>
            <div className="loginAuth-FormInput" style={{ width: '100%' }}>
              <input
                type="text"
                name="mobileNum"
                id="mobileNum"
                placeholder="Enter your mobile number"
                style={{ width: '100%' }}
                className={
                  mobileNum === ''
                    ? 'loginAuth-formInput'
                    : invalidPhone
                    ? 'loginAuth-formInput loginAuth-formInputSuccess'
                    : 'loginAuth-formInput loginAuth-formInputError'
                }
                onChange={phoneNumValidation}
                autoComplete="off"
                required
              />
              {/* loginAuth-formInputSuccess */}
              {/* loginAuth-formInputError */}
              <label htmlFor="mobileNum">Mobile Number</label>
            </div>
          </div>
          <button className="loginAuth-formSubmit" disabled={!invalidPhone}>
            Continue
          </button>
        </form>
      </div>

      <span className="already-text">
        Already have an account?
        <span
          className="login-text"
          onClick={() => {
            navigate('/onboarding/login');
          }}
        >
          {' '}
          Login
        </span>
      </span>
      <div className="face-goog-buttons">
        <button className="facebook-button">{facebook}</button>
        <button className="google-button">{google}</button>
      </div>
      <ToastContainer />
      {loading && <Loading />}
    </div>
  );
};

export default RegistrationForm;
