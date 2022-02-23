import React, { useContext } from 'react'
import '../../styles/profileScreen.css'
import { AuthContext } from '../auth/AuthContext'

export const ProfileScreen = () => {
    const {user} = useContext(AuthContext)
  return (
    <div className='profile-main-container'>
        <header>
            <div className='profile-user-header-container'>
                <img src="./img/back.png" alt="back" />
                <h2>{user.name.toUpperCase()}</h2>
            </div>
            <div className='profile-btn-logout'>
                LOGOUT
                <img src="./img/logout.png" alt="logout" />
            </div>
        </header>
        <div className='profile-back profile-img-name-container'>
            <img 
                src="./img/ornacia.png" 
                alt="ornacia" 
                style={{borderColor: user.color}}
            />
            <div className='box-username'>
                <p>{user.name.toUpperCase()}</p>
            </div>
            <div className='profile-post-favorites-container'>
                <div className='post-container'>
                    <span>POST</span>
                </div>
                <div className='favorites-container'>
                    <span>FAVORITES</span>
                </div>
            </div>
        </div>
    </div>
  )
}
