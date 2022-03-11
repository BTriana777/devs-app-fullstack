import React, { useContext } from "react";
import { getAuth, signInWithPopup } from "firebase/auth";
import { provider, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

import "../../styles/loginScreen.css";
import { AuthContext } from "./AuthContext";

export const LoginScreen = ({ setChecking }) => {
  const { user, setUser } = useContext(AuthContext);

  //funcion para setear el state user dependiendo si ya se habia registrado
  const changeUser = (docSnap, singIn) => {
    if (docSnap.data()?.name) {
      setUser({
        name: docSnap.data().name,
        color: docSnap.data().color,
        uid: singIn.user.uid,
        logged: true,
      });
    } else {
      setUser({
        ...user,
        uid: singIn.user.uid,
        logged: true,
      });
    }
  };

  const startGoogleLogin = async () => {
    setChecking(true);
    const auth = getAuth();
    try {
      const singIn = await signInWithPopup(auth, provider);
      const docSnap = await getDoc(doc(db, "users", `${auth.currentUser.uid}`));
      changeUser(docSnap, singIn);
    } catch (error) {
      console.error("idk", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left-container">
        <img src="../img/logo.png" alt="logo" />
        <img
          className="login-img-text"
          src="../img/letterlogo.png"
          alt="logo"
        />
      </div>
      <div className="login-right-container">
        <div className="login-text-container">
          <h1>Lorem ipsum dolor</h1>
          <p className="login-text-p">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>

          <div className="google-btn" onClick={startGoogleLogin}>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <div className="btn-text">
              <p>Sign in with google</p>
            </div>
          </div>

          <p className="text-devs-beta">
            © 2020 Devs_United - <span>BETA</span>
          </p>
        </div>
      </div>
    </div>
  );
};
