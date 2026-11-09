
import * as yup from "yup";

const UserSchema = yup.object({
  fullname: yup
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters!")
    .required("Name is required!"),

  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Please enter a valid email!")
    .required("Email is required!"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters!")
    .matches(/[A-Z]/, "Include at least one uppercase letter!")
    .matches(/[a-z]/, "Include at least one lowercase letter!")
    .matches(/\d/, "Include at least one number!")
    .required("Password is required!"),

  phone: yup
    .string()
    .matches(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number!"
    )
    .required("Phone number is required!"),

  acceptedTerms: yup
    .boolean()
    .oneOf([true], "Please accept the terms and conditions!"),
});

export default UserSchema;
