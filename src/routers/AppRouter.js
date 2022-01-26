import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { WelcomeScreen } from '../components/welcome/WelcomeScreen';

export const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
      </Routes>
    </BrowserRouter>
  )
};
