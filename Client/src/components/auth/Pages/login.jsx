import React, { useState } from "react";
import "../auth.css";
import { BsEyeSlash , BsEye ,BsGoogle} from "react-icons/bs";
import { Link , useNavigate} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {passwordValidation ,emailValidation , load , Lottie , toastStyle}  from '../../index'
import {userData} from '../../../const/axiosClon';
const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading , setLoading] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const emailValid = emailValidation(email)
    const passwordValid = passwordValidation(password)
    if(!email || !password) toast.error('Please enter both email and password',{style: toastStyle});
    else if(!emailValid) toast.error('Invalid email format',{style: toastStyle});
    else if(passwordValid) toast.error(passwordValid,{style: toastStyle});
    else{
      setLoading(true);
      let {status , message} = await userData('/user/signin',{email , password});
      if(status === 200){
           setLoading(false);
           navigate(`/verify/login/${email}`)
      }else{
        setLoading(false);
        toast.error(message,{style: toastStyle});
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
        <h1>Login.</h1>
        <div className="google">
          <BsGoogle />
          <p>Containue with Google</p>
        </div>
        <p>or</p>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <div>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"/>
            </div>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" id='password'/>
              <span className="toggle-password repassword" onClick={()=>togglePasswordVisibility()}>{passwordVisibility?<BsEye/>:<BsEyeSlash/>}</span>
            </div>
            <button type="submit" className="submit">Login {(loading)?<Lottie className='icon' animationData={load}/>:null}</button>
          </form>
        </div>
        <div className='sign-up'>
            <p>Don't have an account?</p>
            <Link to='/register'>Register</Link>
        </div>
        <Link to='/forget-password'>Forget password</Link>
      </div>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  );
};

export default Login;
