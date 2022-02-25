import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../../styles/homeScreen.css'
import { AuthContext } from '../auth/AuthContext'

export const HomeScreen = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  const [form, setForm] = useState("")
  const [barProgress, setbarProgress] = useState(0)

  const handelInputChange = ({target}) => {
    setForm(target.value);
    setbarProgress(target.value.length/2);
  }
  const handleClickProfile = () =>{
    navigate('/profile',
      {replace: true})
  }

  //Todo: hacer borde de color que escoja el usuario
  return (
    <div className='home-main-container'>
        <div className='home-header-container'>
            <img 
              className='img-header' 
              src="./img/ornacia.png" 
              alt="./img/ornacia"
              style={{borderColor: user.color}}
              onClick={handleClickProfile}
            />
            <img className='logo-header' src="./img/logo.png" alt="./img/logo" />
            <img className='letter-header' src="./img/letterlogo.png" alt="./img/letterlogo" />
        </div>
        <div className='home-back'>
          <div className='form-container'>
            <img src="./img/ornacia.png" alt="./img/ornacia.png" />
            <form className='home-text-button-container'>
              <textarea 
                type="text" 
                maxLength={200} 
                placeholder={"what's happening?"} 
                value={form}
                onChange={handelInputChange}
              />
              <div 
                className='input-bar'
                style={{width: barProgress+'%'}}
              ></div>
              <span>200 max.</span>
              <button>POST</button>
            </form>
          </div>
        </div>
        <div className='home-post-container'>

        </div>
    </div>
  )
}
