import React, { useContext, useEffect } from 'react';
import { getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { provider, db } from '../../firebase/firebase';
import {doc, getDoc  } from "firebase/firestore";

import '../../styles/loginScreen.css'
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export const LoginScreen = ({setChecking}) => {
  
  const navigate = useNavigate();
  const {user, setUser} = useContext(AuthContext);

  // useEffect(() => {

  //   const auth = getAuth();
  //       onAuthStateChanged(auth, (user) =>{
  //           console.log(user);
  //       })
  
  // }, []);
  
  const changeUser = (docSnap, singIn) => {
    if(docSnap.data()?.name){
       setUser({
        ...user,
        name: docSnap.data().name,
        color: docSnap.data().color,
        uid: singIn.user.uid,
      });
    } else {
      setUser({
        ...user,
        uid: singIn.user.uid,
      })
    }
  }

  const startGoogleLogin = async() => {
    const auth = getAuth();
    setChecking(true);
    try {
      const singIn = await signInWithPopup(auth, provider)
      const docSnap = await getDoc(doc(db, "users", `${auth.currentUser.uid}`))
      changeUser(docSnap, singIn)
      .then(() => {
      setUser({
        ...user,
        logged: true
      })})
    } catch (error) {
      console.error("idk", error);
    }
    setChecking(false)
  }

  return(
      <div className='login-container'>
          <div className='login-left-container'>
            <img src='../img/logo.png' alt='logo'/>
            <img className='login-img-text' src='../img/letterlogo.png' alt='logo'/>
          </div>
          <div className='login-right-container'>
            <div className='login-text-container'>
              <h1>Lorem ipsum dolor</h1>
              <p className='login-text-p'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>

              <div
                className="google-btn"
                onClick={startGoogleLogin}
              >
                <div className="google-icon-wrapper">
                  <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <div className="btn-text">
                  <p>Sign in with google</p>
                </div>
              </div>
              
              <p className='text-devs-beta'>© 2020 Devs_United - <span>BETA</span></p>
            </div>
          </div>
      </div>
  )
};
