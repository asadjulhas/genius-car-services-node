import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import googleIcon from '../../../images/google.svg'

const GoogleLogin = () => {
  const [signError, setError] = useState('') 
    // Sign in with Google
    const [signInWithGoogle,  user, loading, error] = useSignInWithGoogle(auth);
    const signInWithGooglePage = () => {
      signInWithGoogle();
    }
    return (
      <div>
        <span className='text-danger'>{error?.message}</span>
        <button onClick={signInWithGooglePage} className='google_signin'><img width={20} src={googleIcon} alt="" /> &nbsp; {loading ? <Spinner animation="border" variant="success" /> : 'Continue with Google'}</button>
      </div>
    );
};

export default GoogleLogin;