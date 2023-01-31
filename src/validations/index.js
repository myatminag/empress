import * as yup from "yup";

/**
 * ^                        Match the beginning of the string
 * (?=.*[0-9])              Require that at least one digit appear anywhere in the string
 * (?=.*[a-z])              Require that at least one lowercase letter appear anywhere in the string
 * (?=.*[A-Z])              Require that at least one uppercase letter appear anywhere in the string
 * (?=.*[-\#\$\.\%\&\*])    Require that at least one special character appear anywhere in the string
 * .{5,20}                  The password must be at least 5 characters long, but no more than 20
 * $                        Match the end of the string.
 */

// eslint-disable-next-line no-useless-escape
const passwordRules = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*]).{5,20}$/;

export const LoginSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required!')
        .email('Must be a valid email!'),
    password: yup
        .string()
        .required('Password is required!')
        .min(5, 'Password must be at least 5 characters!')
        .matches(passwordRules, { message: "At least one [1-9],[A-Z],[a-z], special character" })
        .max(20, 'Password must be at most 20 characters!')
});

export const SignupSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters long!"),
    email: yup
        .string()
        .required('Email is required!')
        .email('Must be a valid email!'),
    password: yup
        .string()
        .required('Password is required!')
        .min(5, 'Password must be at least 5 characters!')
        .matches(passwordRules, { message: "At least one [1-9],[A-Z],[a-z], special character" })
        .max(20, 'Password must be at most 20 characters!'),
    cpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Confirm password does not match!")
        .required("Required"),
});

export const EmailSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required!')
        .email('Must be a valid email!'),
});

export const PasswordSchema = yup.object().shape({
    password: yup
        .string()
        .required('Password is required!')
        .min(5, 'Password must be at least 5 characters!')
        .matches(passwordRules, { message: "At least one [1-9],[A-Z],[a-z], special character" })
        .max(20, 'Password must be at most 20 characters!'),
    cpassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Confirm password does not match!")
        .required("Required"),
});

export const UpdateSchema = yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters long!"),
    email: yup
        .string()
        .required('Email is required!')
        .email('Must be a valid email!'),
    password: yup
        .string()
        .required('Password is required!')
        .min(5, 'Password must be at least 5 characters!')
        .matches(passwordRules, { message: "At least one [1-9],[A-Z],[a-z], special character" })
        .max(20, 'Password must be at most 20 characters!'),
});