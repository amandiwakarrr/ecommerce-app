import * as yup from "yup";

const UserSchema = yup.object({
    fullname: yup
        .string()
        .trim()
        .min(3, "Name must be atleast 3 characters!")
        .required("Name is required!"),

    email: yup
        .string()
        .trim()
        .lowercase()
        .email("Please enter valid email!")
        .required("Email is required"),

    password: yup
        .string()
        .min(8, "Password must be at least 8 characters!")
        .matches(/[A-Z]/, "Include at least one uppercase letter!")
        .matches(/[a-z]/, "Include at least one lowercase letter!")
        .matches(/\d/, "Include at least one number!")
        .required("Password is required!"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match!")
        .required("Please confirm your password!"),

    phone: yup
        .string()
        .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number!")
        .required("Phone number is required!"),

    gender: yup
        .string()
        .oneOf(["male", "female", "other"], "Please select a valid gender!")
        .required("Gender is required!"),

    dob: yup
        .date()
        .typeError("Enter a valid date of birth!")
        .max(new Date(), "Date of birth cannot be in the future!")
        .required("Date of birth is required!"),

    address: yup
        .string()
        .trim()
        .min(10, "Please enter a complete address!")
        .required("Address is required!"),
})

export default UserSchema