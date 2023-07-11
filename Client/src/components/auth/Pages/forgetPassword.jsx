import React, { useState } from "react";
import "../auth.css";
import { Link,useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {load , Lottie , emailValidation , toastStyle}  from '../../index'
import {userData} from '../../../const/axiosClon'
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailValid = emailValidation(email);
    if(!emailValid)  toast.error('Invalid email format',{style: toastStyle});
    else{
      setLoading(true);
      let {status , message} = await userData('/user/forgetpassword',{email});
      if (status === 200) {
        setLoading(false);
        navigate(`/verify/forget-password/${email}`);
      } else {
        toast.error(message, { style: toastStyle });
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth">
      <div className="child1"></div>
      <div className="child2"></div>
      <div className="form">
        <h3 style={{ fontWeight: "500", width: "400px" }}>
          Enter your email address to recieve a verification code.
        </h3>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <div>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}placeholder="Email"/>
            </div>
            <button type="submit" className="submit">
              Send Code{" "}
              {loading ? (
                <Lottie className="icon" animationData={load} />
              ) : null}
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

export default ForgetPassword;
