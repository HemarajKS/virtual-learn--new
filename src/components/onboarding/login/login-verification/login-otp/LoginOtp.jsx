import './LoginOtp.css';
import OTPInput, { ResendOTP } from 'otp-input-react';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePassword,
  registerOtp,
  registerPersonalDetails,
} from '../../../../../redux/reducers/Conditions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../../../utils/loading/Loading';

const LoginVerfication = () => {
  const [OTP, setOTP] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  console.log('location', location.pathname);

  const changePass = useSelector((state) => state.loginConditions.passChange);

  const submitHandler = (e) => {
    e.preventDefault();
    if (location.pathname === '/onboarding/registerOtp') {
      if (OTP.length === 4) {
        sendOtpServer(OTP, '/newUser/verify');
      }
      // dispatch(registerPersonalDetails(true));
      // navigate("/onboarding/personalDetails");
    } else if (location.pathname === '/onboarding/otpVerification') {
      // dispatch(changePassword(true));
      // navigate("/onboarding/changePassword");
      sendOtpServer(OTP, '/newUser/verify');
    }
  };

  const sendOtpServer = (otp, url) => {
    setLoading(true);
    console.log('OTP', otp, url);
    fetch(
      `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com${url}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: sessionStorage.getItem('regMobileNum'),
          oneTimePassword: otp,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log('response', res);
        setLoading(false);
        if (location.pathname === '/onboarding/registerOtp') {
          if (res && res.message === 'Verified') {
            dispatch(registerPersonalDetails(true));
            navigate('/onboarding/personalDetails');
          } else if (res.message === 'Input field is incorrect') {
            dispatch(registerPersonalDetails(false));
            showError(res.message);
          } else if (res.message === 'Verification Fail') {
            dispatch(registerPersonalDetails(false));
            showError(res.message);
          }
        }
        if (location.pathname === '/onboarding/otpVerification') {
          if (res && res.message === 'Verified') {
            dispatch(changePassword(true));
            navigate('/onboarding/changePassword');
          } else {
            dispatch(registerPersonalDetails(false));
            showError(res.message);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        alert('some error occured');
      });
  };

  useEffect(() => {
    console.log('change pass', changePass);
  }, [changePass]); //when otp is valid(this comes from redux)

  const showError = (msg) => {
    toast(
      <div className="loginAuth-showError">
        <div className="loginAuth-showErrorIcon">
          <img
            src={require('../../../../../assets/icons/icn_invalid error.png')}
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

  const resent = (msg) => {
    toast.success(
      <div
        className="loginAuth-showError"
        style={{ background: 'var( --success) !important' }}
      >
        <div className="loginAuth-showErrorMessage">{msg}</div>
      </div>,
      {
        position: 'bottom-right',
        theme: 'colored',
        autoClose: 5000,
        hideProgressBar: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  return (
    <div className="login-verification">
      <p className="login-verification-heading">Verify Account</p>
      <p className="login-verification-content">
        Please fill in the verification code that has been sent to your mobile
        number.
      </p>
      <form className="login-verification-form" onSubmit={submitHandler}>
        <div className="otp">
          <OTPInput
            value={OTP}
            onChange={setOTP}
            autoFocus
            OTPLength={4}
            otpType="number"
            disabled={false}
            inputStyles={{
              width: '30%',
              outline: 'none',
              fontSize: '20px',
              paddingBottom: '15px',
              backgroundColor: 'transparent',
              color: 'white',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: '1px solid rgba(255, 255, 255, 0.411)',
            }}
          />
          {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
          <p className="resend-otp">
            Didn’t receive a code?{' '}
            <span
              onClick={() => {
                setLoading(true);
                fetch(
                  `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/newUser/resend`,
                  {
                    method: 'PUT',
                    headers: {
                      Accept: 'application/json, text/plain, */*',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      mobileNumber: sessionStorage.getItem('regMobileNum'),
                    }),
                  }
                )
                  .then((res) => res.json())
                  .then((res) => {
                    setLoading(false);
                    if (res.message === 'OTP Valid For 2 Minutes') {
                      resent(res.message);
                    }
                  })
                  .catch((err) => {
                    setLoading(false);
                    alert('some error occured');
                  });
              }}
            >
              {' '}
              Resend
            </span>
          </p>
        </div>
        <button className="verify-otp-button" onClic>
          Verify
        </button>
      </form>
      <ToastContainer />
      {loading && <Loading />}
    </div>
  );
};

export default LoginVerfication;
