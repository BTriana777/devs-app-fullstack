import React, {useContext, useEffect, useState} from 'react';
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from '@firebase/auth';

import { AuthContext } from '../components/auth/AuthContext';
import { HomeScreen } from '../components/home/HomeScreen';
import { LoadingScreen } from '../components/loading/LoadingScreen';
import { ProfileScreen } from '../components/profile/ProfileScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { LoginScreen } from '../components/auth/LoginScreen';
import { WelcomeScreen } from '../components/welcome/WelcomeScreen';

export const AppRouter = () => {
  const {user, setUser} = useContext(AuthContext)
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    
    const auth = getAuth();
    onAuthStateChanged(auth, (useer) =>{
      if(useer?.uid){
        setUser({
          ...user,
          uid: useer.uid,
          logged: true
        })
      }
      setChecking(false);
    })
    
  }, [setUser, setChecking])

  if(checking){
    return(
      <LoadingScreen />
    )
  }
  

  return (
    <BrowserRouter>
        <Routes>
        <Route path='/profile' element={
          <PrivateRoute isAuth={user.logged}>
            <ProfileScreen />
          </PrivateRoute>
        } />
        <Route path='/' element={
          <PrivateRoute isAuth={user.logged}>
            <HomeScreen />
          </PrivateRoute>
        } />
        <Route path='/welcome' element={<WelcomeScreen />} />

        <Route path="/login" element={
          <PublicRoute isAuth={user.logged}>
            <LoginScreen setChecking={setChecking} />
          </PublicRoute>
        } />
        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </BrowserRouter>
  )
};
