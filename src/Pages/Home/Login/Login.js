import React, { useRef } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import GoogleLogin from './GoogleLogin';
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  let errorElement;
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const [userr] = useAuthState(auth);
  if(userr) {
    navigate(from, { replace: true });
  }
 
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const emailRef = useRef('')
  const passwordRef = useRef('')  

  const loginForm = event => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    signInWithEmailAndPassword(email, password);
  }
 
  // Forget Password
    const [sendPasswordResetEmail, sending, error2] = useSendPasswordResetEmail(auth);

    const SendPasswordReset =async () => {
      const email = emailRef.current.value;
     if(email) {
      await sendPasswordResetEmail(email);
      console.log(error2)
      if(!error2) {
        toast('Reset Password email sent.');
      }
     } else {
      toast('Please provide a email');
     }
    }
   
    if(error || error2) {
      errorElement = 'a';
       errorElement = <span className='text-danger'>{error?.message} {error2?.message}</span>
    }
   

  return (
    <div className='login_page pt-1'>

      <div className="login_form">
        <h3>Login</h3>
        <form onSubmit={loginForm}>
          <label>Email</label><br />
          <input ref={emailRef} required type="email" /><br />
          <label>Password</label><br />
          <input ref={passwordRef} required type="password" /><br />
          {errorElement}
          <button className='login_btn'>
          {loading ? <Spinner animation="border" variant="success" /> : 'Login'}
            </button><br />
          <span>New to genius-car-services? <Link to='/register'>Create New Account</Link></span>
          <p className='m-0'>or</p>
        </form>
        <ToastContainer />
        <button className='btn-warning btn-sm mb-2' onClick={SendPasswordReset}>Reset password</button><br />
        <GoogleLogin/>
      </div>
      
    </div>
  );
};


export default Login;