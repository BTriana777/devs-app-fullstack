import React from 'react';
import '../../styles/loginScreen.css'

export const LoginScreen = () => {
  return(
      <div className='login-container'>
          <div className='login-left-container'>
            <img src='./img/logo.png' alt='logo'/>
            <img src='./img/letterlogo.png' alt='logo'/>
          </div>
          <div className='login-right-container'>
            <div className='login-text-container'>
                <h1>Lorem ipsum dolor</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <div className='singing-google'>
                </div>
                <p>© 2020 Devs_United - <span>BETA</span></p>
            </div>
          </div>
      </div>
  )
};
