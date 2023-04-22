import * as Yup from "yup";
import "yup-phone";

export const editSchema = Yup.object({
  editPUsername: Yup.string().min(2).max(25).required("Please enter your name"),
  editPfullname: Yup.string().min(2).max(25).required("Please enter your name"),
  editPEmail: Yup.string().email().required("Please enter your email"),
  editPOccupation: Yup.string().required("Please enter your Occupation"),
  MobileNo: Yup.string().phone().required(),
  // editPmobile:Yup.string().max(10).matches(/[0-9]/, 'Password requires a number').required('Please enter mobile number'),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Please enter your password"),
  TwitterURL: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter correct url!"
  ),
  FacebookURL: Yup.string().matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter correct url!"
  ),
});
