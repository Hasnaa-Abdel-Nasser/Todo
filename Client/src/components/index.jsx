import HomePage from "./home/homepage";
import Register from "./auth/Pages/register";
import Login from "./auth/Pages/login";
import VerifyEmail from "./auth/Pages/verifyEmail";
import ForgetPassword from "./auth/Pages/forgetPassword";
import NewPassword from "./auth/Pages/newPassword";
import Upcoming from "./todo/upcoming/upcoming";
import {
  emailValidation,
  passwordValidation,
  codeValidation,
} from "./auth/authService";
import Lottie from "lottie-react";
import load from "./images/loading.json";

const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
  fontSize: "14px",
};

export {
  HomePage,
  Register,
  Login,
  VerifyEmail,
  NewPassword,
  ForgetPassword,
  emailValidation,
  passwordValidation,
  codeValidation,
  Lottie,
  load,
  toastStyle,
  Upcoming,
};
