import React, { useContext, useState } from 'react';

import '../../styles/welcomeScreen.css'
import { AuthContext } from '../auth/AuthContext';

export const WelcomeScreen = () => {
  const initialColors = {
    red: false,
    orange: false,
    yellow: false,
    green: false,
    blue: false,
    purple: false
  }
  
  const [colorClass, setColorClass] = useState(initialColors);
  const [textValue, setTextValue] = useState('');

  const {user, setUser} = useContext(AuthContext);

  const handleClickBox = ({target}) => {
    setColorClass({
      ...initialColors,
      [target.id]: true
    })
  }
  const handleTextChange = ({target}) => {
    setTextValue(target.value)
  }
  const handleClickBtn = () => {
    let color = ''
    if(colorClass.red){
      color = '#F50D5A'
    } if ( colorClass.orange){
      color = '#FF865C'
    } if ( colorClass.yellow){
      color = '#FFEA5C'
    } if (colorClass.green){
      color = '#00DA76'
    } if ( colorClass.blue ){
      color = '#0096CE'
    } if (colorClass.purple) {
      color = '#800FFF'
    }
    setUser({
      ...user,
      name: textValue,
      color: color
    })
  }

  return (
    <div className='welcome-container'>
      <div className='welcome-left-container'>
        <img src='./img/logo.png' alt='logo'/>
        <img src='./img/letterlogo.png' alt='logo'/>
      </div>
      <div className='welcome-right-container'>
        <div className='welcome-container-right-all'>
          <div className='welcome-title-container'>
            <h1>WELCOME</h1>
            <h1 className='welcome-title-name'>NAME!</h1>
          </div>
          <input
            className='welcome-input'
            type='text'
            placeholder='Type your name'
            value={textValue}
            onChange={handleTextChange}
          />
          <div className='welcome-select-color-container'>
            <p>Select your favorite color</p>
            <div className='color-container'>
              <div className={`color-box red ${colorClass.red && 'box-clicked'}`}  id='red' onClick={handleClickBox}></div>
              <div className={`color-box orange ${colorClass.orange && 'box-clicked'}`} id='orange' onClick={handleClickBox}></div>
              <div className={`color-box yellow ${colorClass.yellow && 'box-clicked'}`} id='yellow' onClick={handleClickBox}></div>
              <div className={`color-box green ${colorClass.green && 'box-clicked'}`} id='green' onClick={handleClickBox}></div>
              <div className={`color-box blue ${colorClass.blue && 'box-clicked'}`} id='blue' onClick={handleClickBox}></div>
              <div className={`color-box purple ${colorClass.purple && 'box-clicked'}`} id='purple' onClick={handleClickBox}></div>
            </div>
          </div>

          <button 
            className='welcome-btn-continue'
            onClick={handleClickBtn}
          >CONTINUE</button>

          <p className='text-devs-beta'>© 2020 Devs_United - <span>BETA</span></p>
        </div>
      </div>
    </div>
  )
};
