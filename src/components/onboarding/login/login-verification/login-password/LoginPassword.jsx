import './LoginPassword.css';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import {
  changePassword,
  otpPage,
  passChangeSuccess,
} from '../../../../../redux/reducers/Conditions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../../../utils/loading/Loading';

const initialValues = {
  password: '',
  cpassword: '',
};
const LoginPassword = () => {
  useEffect(() => {
    dispatch(otpPage(false));
  }, []);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, 'Password must be 6 characters long')
        .matches(/[0-9]/, 'Password must contain a number')
        .matches(/[a-z]/, 'Password must contain a lowercase letter')
        .matches(/[A-Z]/, 'Password must contain an uppercase letter')
        .matches(/[^\w]/, 'Password must contain a special symbol')
        .required('Please Enter your password'),
      cpassword: Yup.string()
        .oneOf(
          [Yup.ref('password  '), null],
          'Must match "password" field value'
        )
        .required('Please Enter your password'),
    }),
    onSubmit: (values) => {
      // dispatch(passChangeSuccess(true));
      // navigate("/passwordChangedSuccessfully");

      changePW(values);
    },
  });

  const changePW = (data) => {
    setLoading(true);
    console.log('data', data);
    fetch(
      `http://virtuallearn-env.eba-6xmym3vf.ap-south-1.elasticbeanstalk.com/resetPassword`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobileNumber: sessionStorage.getItem('regMobileNum'),
          oneTimePassword: data.password,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.message === 'Password Changed Successfully') {
          dispatch(passChangeSuccess(true));
          navigate('/passwordChangedSuccessfully');
        } else {
          showError(res.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        alert('some error occured');
      });
  };

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

  return (
    <div className="login-password">
      <p className="login-password-heading">Create New Password</p>
      <p className="login-password-content">
        Your password must have at least 6 or more characters
      </p>
      <form className="login-password-form" onSubmit={formik.handleSubmit}>
        <div className="input">
          <input
            className="login-input"
            type="password"
            id="password"
            name="password"
            placeholder=" "
            autoComplete="off"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="login-password-label" htmlFor="password">
            Password
          </label>
          {formik.touched.password && formik.errors.password ? (
            <>
              <div className="error-line error-line-underline"></div>
              <p className="password-error">{formik.errors.password}</p>
            </>
          ) : null}
        </div>
        <div className="input">
          <input
            className="login-input"
            type="password"
            id="cpassword"
            name="cpassword"
            placeholder=" "
            autoComplete="off"
            value={formik.values.cpassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="login-password-label" htmlFor="cpassword">
            Confirm New Password
          </label>
          {formik.touched.cpassword && formik.errors.cpassword ? (
            <>
              <div className="error-line error-line-underline"></div>
              <p className="password-error">{formik.errors.cpassword}</p>
            </>
          ) : null}
        </div>
        <button className="reset-password" type="submit">
          Reset Password
        </button>
      </form>
      <ToastContainer />
      {loading && <Loading />}
    </div>
  );
};

export default LoginPassword;
