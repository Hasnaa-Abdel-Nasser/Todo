import React, { useState } from "react";
import "../auth.css";
import { BsEyeSlash , BsEye} from "react-icons/bs";
import { Link ,useNavigate , useLocation} from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {passwordValidation , load,Lottie , toastStyle}  from '../../index'
import { newPassword } from "../../../const/axiosClon";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [rePasswordVisibility, setRePasswordVisibility] = useState(false);
  const [loading , setLoading] = useState(false);
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const passwordValid = passwordValidation(password)
    if(passwordValid)  toast.error(passwordValid,{style: toastStyle});
    else if (password !== rePassword)  toast.error('Incorrect confirm password',{style: toastStyle});
    else{
      setLoading(true);
      let {status , message} = await newPassword('/user/newpassword', {email:location.state.email , password , rePassword});
      if(status === 200){
        toast.success(message,{style: toastStyle})
        setLoading(false);
        navigate('/login');
      }else{
        toast.error(message,{style: toastStyle});
        setLoading(false);
      }
    }  
  };

  function togglePasswordVisibility(field) {
    var passwordField = document.getElementById(field);
    if (passwordField.type === "password") {
      passwordField.type = "text";
      if(field === 'password') setPasswordVisibility(true)
      else setRePasswordVisibility(true)
    } else {
      passwordField.type = "password";
      if(field === 'password') setPasswordVisibility(false);
      else setRePasswordVisibility(false);
    }
  }

  return (
    <div className="auth">
      <div className="child1"></div>
      <div className="child2"></div>
      <div className="form">
      <h2 style={{ width:'400px'}}>Create new password.</h2>
        <div className="inputs">
          <form onSubmit={handleSubmit}>
            <div>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required id='password'/>
              <span className="toggle-password" onClick={()=>togglePasswordVisibility('password')}>{passwordVisibility?<BsEye/>:<BsEyeSlash/>}</span>
            </div>
            <div>
              <input type="password" value={rePassword} onChange={(e) => setRePassword(e.target.value)} placeholder="Confirm Password" required id='repassword'/>
              <span className="toggle-password repassword" onClick={()=>togglePasswordVisibility('repassword')}>{rePasswordVisibility?<BsEye/>:<BsEyeSlash/>}</span>
            </div>
            <button type="submit" className="submit">
              Submit {(loading)?<Lottie className='icon' animationData={load}/>:null}
            </button>
          </form>
        </div>
        <div className='sign-up'>
            <p>Go Back ?</p>
            <Link to='/login'>Login</Link>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  );
};

export default NewPassword;
