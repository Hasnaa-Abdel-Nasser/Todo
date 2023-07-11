import React, { useEffect, useState } from "react";
import "../auth.css";
import { HiArrowSmRight } from "react-icons/hi";
import { Link, useNavigate , useParams} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import{codeValidation,load , Lottie , toastStyle}  from '../../index'
import { verifyCode } from "../../../const/axiosClon";
import {formatTime} from '../authService'

const VerifyEmail = () => {
  const { email, process } = useParams();
  const signIn = useSignIn();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [currentCell, setCurrentCell] = useState(0);
  const [timer, setTimer] = useState(60);
  const [color, setColor] = useState("rgb(166, 166, 166)");
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = e.target.value;
    setInputs(updatedInputs);
    if (index < 4 && e.target.value.length === 1) {
      setCurrentCell(index + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codeValidation(inputs))
      toast.error("Invalid Inputs", { style: toastStyle });
    else {
      setLoading(true);
      let code = inputs.toString().replace(/,/g, "");
      let {status , message , token} = await verifyCode('/user/verify',{ email, code, process });
      if(status === 200){
        if(token){
          signIn({
            token: token,
            expiresIn: 90,
            tokenType: "Bearer",
            authState: { email },
          });
        }
        toast.success(message, { style: toastStyle });
        setLoading(false);
        if (process === "forget-password") {
          navigate("/new-password", { state: { email } });
        } else {
          navigate("/dashboard");
        }
      }else{
        toast.error(message, { style: toastStyle });
        setLoading(false);
      }
    }
  };

  const handleResendCode = async () => {
    if (timer > 0) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/resend/email",
        { email }
      );
      toast.success("Successfully Resend Code!", { style: toastStyle });
      setLoading(false);
      setTimer(60);
      setColor("rgb(166, 166, 166)");
      setInputs(["", "", "", "", ""]);
    } catch (error) {
      toast.error("Can't Send Code Now.", { style: toastStyle });
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    let endTimer;
    if (timer > 0) {
      endTimer = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setColor("white");
    }
    return () => {
      clearInterval(endTimer);
    };
  }, [timer]);


  return (
    <div className="auth">
      <div className="child1"></div>
      <div className="child2"></div>
      <div className="form">
        <h1>Check your email.</h1>
        <p style={{ fontSize: "13px", marginTop: "-20px", marginBottom: "20px" }}>We've sent a code to {email}</p>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <div className="verify-form">
              {inputs.map((input, index) => (
                <div key={index} className="verify">
                  <input type="text" maxLength={1} key={index} value={input} onChange={(e) => handleChange(e, index)} autoFocus={index === currentCell}/>
                </div>
              ))}
            </div>
            <div className="timer">
              <p>{formatTime(timer)}</p>
            </div>
            <div className="resend-email" style={{color: color,cursor: color !== "white" ? "default" : "pointer", }} onClick={() => handleResendCode()}>
              <p>Resend code </p>
              <HiArrowSmRight />
            </div>
            <button type="submit" className="submit">
              Verify{" "}
              {loading ? (<Lottie className="icon" animationData={load} />) :null}
            </button>
          </form>
        </div>
        <div className="sign-up">
          <p>Go Back ?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default VerifyEmail;
