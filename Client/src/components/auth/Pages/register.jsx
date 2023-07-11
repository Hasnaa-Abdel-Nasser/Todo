import React, { useState } from "react";
import "../auth.css";
import { BsEyeSlash , BsEye ,BsGoogle} from "react-icons/bs";
import { Link , useNavigate} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {emailValidation, passwordValidation , Lottie ,load , toastStyle} from '../../index'
import { userData } from "../../../const/axiosClon";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading , setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const emailValid = emailValidation(email)
    const passwordValid = passwordValidation(password)
    if(!email || !password || !name) toast.error('Please enter both name , email and password',{style: toastStyle});
    else if(!emailValid) toast.error('Invalid email format',{style: toastStyle});
    else if(passwordValid) toast.error(passwordValid,{style: toastStyle});
    else{
    setLoading(true);
    let {status , message} = await userData('/user/signup',{name , email , password});
    if(status === 200){
      setLoading(false);
      navigate(`/verify/register/${email}`)
    }else{
      toast.error(message,{style: toastStyle});
      setLoading(false);
    }
  }
};

  function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
      setPasswordVisibility(true)
    } else {
      passwordField.type = "password";
      setPasswordVisibility(false);
    }
  }
  return (
    <div className="auth">
      <div className="child1"></div>
      <div className="child2"></div>
      <div className="form">
        <h1>Register.</h1>
        <div className="google"> <BsGoogle /><p>Containue with Google</p> </div>
        <p>or</p>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" id='password' />
              <span className="toggle-password register" onClick={()=>togglePasswordVisibility()}>{passwordVisibility?<BsEye/>:<BsEyeSlash/>}</span>
              <button type="submit" className="submit">
                Register {(loading)?<Lottie className='icon' animationData={load}/>:<></>}
              </button>
          </form>
        </div>
        <div className='sign-up'>
            <p>Have an account?</p>
            <Link to='/login'>Login</Link>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  );
};

export default Register;
