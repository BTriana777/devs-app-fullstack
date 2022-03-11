import React from 'react'
import '../../styles/loadingScreen.css'
import 'animate.css';

export const LoadingScreen = () => {
  return (
    <div className='loading-main-container'>
      <div className="container">
        <img className='animate__animated animate__pulse animate__infinite animate__slow' src="../img/logo.png" alt="./img/logo.png" />
        <img className='animate__animated animate__pulse animate__infinite animate__slow' src="../img/letterlogo.png" alt="./img/letterlogo.png" />
      </div>
    </div>
  )
}
