import * as Yup from "yup";

export const SignUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Pleace Enter Your Name"),
  email: Yup.string().email().required("Please enter your email Address"),
  password: Yup.string().min(6).required("Please enter your Password"),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "password must match"),
});

