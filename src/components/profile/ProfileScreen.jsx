import React, { useContext, useState } from 'react'
import '../../styles/profileScreen.css'
import { AuthContext } from '../auth/AuthContext'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export const ProfileScreen = () => {
    const navigate = useNavigate()
    const {user, setUser} = useContext(AuthContext)
    const [classBtn, setClassBtn] = useState({
        post: true,
        favo: false
    }) 

    const handleLogout = async() => {
        const auth = getAuth();
        await signOut(auth);
        setUser({
            name: '',
            uid: '',
            color: '',
            logged: false
        })
    }
    const handleClickBack = () => {
        navigate('/', {
            replace: true
        })
    }
    const handleChanceClass = ({target}) => {
        const btnClass = {
            post: false,
            favo: false
        }
        setClassBtn({
            ...btnClass,
            [target.id]: true
        })

    }
  return (
    <div className='profile-main-container'>
        <header>
            <div 
                className='profile-user-header-container'
                onClick={handleClickBack}
            >
                <img src="./img/back.png" alt="back" />
                <h2>{user.name.toUpperCase()}</h2>
            </div>
            <div 
                className='profile-btn-logout'
                onClick={handleLogout}
            >
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
                <div id='post' className={classBtn.post? 'btn-profile btn-active' : 'btn-profile'} onClick={handleChanceClass}>
                    <span>POST</span>
                </div>
                <div id='favo' className={classBtn.favo? 'btn-profile btn-active' : 'btn-profile'} onClick={handleChanceClass}>
                    FAVORITES
                </div>
            </div>
        </div>
    </div>
  )
}
