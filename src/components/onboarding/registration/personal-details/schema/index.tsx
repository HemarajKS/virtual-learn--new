import * as Yup from 'yup'

export const signupSchema = Yup.object({
  UserName: Yup.string().min(2).max(25).required('Please enter your name'),
  fullName: Yup.string().min(2).max(25).required('Please enter your name'),
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^\w]/, 'Password requires a symbol')
    .required('Please enter your password'),

  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    .required('Please enter your password'),
})
