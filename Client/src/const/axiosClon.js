import axios, { AxiosError } from "axios";
import { API } from "./index";
export const userData = async (endPoint, data) => { // Login , Register , Forget Password
  try {
    const response = await axios.post(API + endPoint, data);
    return { status: 200, message: response.data.message };
  } catch (error) {
    if (error && error instanceof AxiosError) {
      return { status: 400, message: error.response.data.message };
    } else if (error && error instanceof Error) {
      return { status: 400, message: error.message };
    }
  }
};

export const verifyCode = async (endPoint, data) => {
  try {
    const response = await axios.patch(API + endPoint, data);
    if(response && response.status === 200)
        return { status: 200, message: "Successfully Verification!" , token:response.data.token};
    else 
        return { status: 400, message: "Incorrect Code" };
  } catch (error) {
    if (error && error instanceof AxiosError) {
      return { status: 400, message: "Incorrect Code" };
    } else if (error && error instanceof Error) {
      return { status: 400, message: error.message };
    }
  }
};

export const newPassword = async (endPoint, data) => {
    try {
        const response = await axios.patch(API + endPoint, data);
        return { status: 200, message: 'Success Change!'};
      } catch (error) {
        if (error && error instanceof AxiosError) {
          return { status: 400, message: error.response.data.message };
        } else if (error && error instanceof Error) {
          return { status: 400, message: error.message };
        }
      }
};
