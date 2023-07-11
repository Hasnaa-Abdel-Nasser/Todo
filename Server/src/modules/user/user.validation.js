import Joi from "joi";
const passwordMessage = {
  "string.min": "Password should have a minimum length of {#limit}",
  "string.max": "Password should have a maximum length of {#limit}",
  "string.pattern.base":
    "Password must contain lowercase letter, uppercase letter, digit, and special character",
    "string.empty": "Password is required",    
}
const emailMessage ={
  "string.empty": "Email is required",
  "string.email": "Invalid email format",
}
export const signUp = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().required().email().messages(emailMessage),
  password: Joi.string()
  .min(8)
  .max(20)
  .required()
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")).messages(passwordMessage),
});

export const signIn = Joi.object({
  email: Joi.string().required().email().messages(emailMessage),
  password: Joi.string()
  .min(8)
  .max(20)
  .required()
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")).messages(passwordMessage),
});

export const verify = Joi.object({
  email: Joi.string().required().email().messages(emailMessage),
  code: Joi.string().required(),
  process: Joi.string(),
});

export const newPassword = Joi.object({
  email: Joi.string().required().email().messages(emailMessage),
  password: Joi.string()
    .min(8)
    .max(20)
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])")).messages(passwordMessage),
  rePassword: Joi.ref("password"),
});

