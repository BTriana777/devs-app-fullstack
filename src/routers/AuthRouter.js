import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { WelcomeScreen } from '../components/welcome/WelcomeScreen';


export const AuthRouter = ({setChecking}) => {
  return (
    <Routes>
      <Route path='login' element={<LoginScreen setChecking={setChecking} />} />
      <Route path='welcome' element={<WelcomeScreen />} />
      <Route path='*' element={<Navigate to='/login' />} />
    </Routes>
  )
}
