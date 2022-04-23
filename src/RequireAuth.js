import { sendEmailVerification } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import './RequireAuth.css'
import { Navigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import auth from "./firebase.init";
import Loading from "./Pages/Home/Login/Loading/Loading";

function RequireAuth({ children }) {
  
  const [user, loading] = useAuthState(auth);
  let location = useLocation();

  if(loading) {
    return(
      <Loading/>
    )
  }

  // console.log(user?.email)
  const sendVerifactionEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      toast('Email verification sent!')
    })
  }

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if(user.providerData[0]?.providerId === 'password' && !user.emailVerified) {
    return(
      <div className="mt-5 d-block">
        <div className="verified_email py-5 px-4 bg-warning w-50 mx-auto rounded">
        <h2 className="text-danger mb-3">
          Please Verify your email
        </h2>
          <button onClick={sendVerifactionEmail} className="btn btn-success">Send Verification Email</button>
          <ToastContainer/>
      </div>
      </div>
    )
  }

  return children;
}

export default RequireAuth;