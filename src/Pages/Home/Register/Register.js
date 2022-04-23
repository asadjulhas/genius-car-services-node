import React, { useState } from 'react';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import { useAuthState, useCreateUserWithEmailAndPassword, useSendEmailVerification, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import GoogleLogin from '../Login/GoogleLogin';
import { Spinner } from 'react-bootstrap';

const Register = () => {
  // Checkbox state
  const[agree, setAgree] = useState(false)

  const loginSuccesss = useNavigate()
  const [userr] = useAuthState(auth);

 
 const [signError, setError] = useState('') 
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth, {sendEmailVerification: true});

  const [updateProfile, updating, error2] = useUpdateProfile(auth);
const loginSuccess = useNavigate()
  const signUpForm =async (e) => {
    e.preventDefault();
    setError(error?.message);
    const userName = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;

    if(!userName) {
      setError('Please provide a name');
      return;
    }

    if(!email) {
      setError('Please provide a email');
      return;
    }

    if(!password) {
      setError('Please provide a password');
      return;
    }

    const validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!validateEmail.test(email)) {
      setError('Please provide a valid email');
      return;
    }

    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if(!validatePassword.test(password)) {
      setError('Password contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number:');
      return;
    }

    if(password !== passwordConfirm) {
      setError('Password not match')
      return;
    }
    if(!agree) {
      setError('Accept with our terms and conditions');
      return;
    }
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: userName });
          loginSuccess('/')
    if(user) {
      setError('Register Successfully, Login now.');
    } else (
      setError(error?.message)
    )
    
  }

 
  return (
    <div className='pt-1'>
       <div className="login_form signup">
        <h3>Sign Up</h3>
        <form onSubmit={signUpForm}>
          <label>Name</label><br />
          <input name='name' required type="text" /><br />
          <label>Email</label><br />
          <input name='email' required type="email" /><br />
          <label>Password</label><br />
          <input name='password' required type="password" /><br />
          <label>Confirm Password</label><br />
          <input name='passwordConfirm' required  type="password" /><br />
          <input onClick={()=> setAgree(!agree)}  type="checkbox" name="terms" id="terms" />
          <label className={agree ? 'text-success' : 'text-danger'} htmlFor="terms">Accept with our terms and conditions</label>
          <span className='text-danger'>{signError}</span>
          <button disabled={!agree} className='login_btn'>
            {loading ? <Spinner animation="border" variant="success" /> : 'Sign Up'}
            </button><br />
          <span>Already have an account? <Link to='/login'>Login</Link></span>
          <p>or</p>
        </form>
         <GoogleLogin></GoogleLogin>
      </div>
    </div>
  );
};

export default Register;