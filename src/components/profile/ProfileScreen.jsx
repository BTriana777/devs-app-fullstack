import React, { useContext, useState, useEffect } from 'react'
import '../../styles/profileScreen.css'
import { AuthContext } from '../auth/AuthContext'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { PostCard } from '../postcard/PostCard';

export const ProfileScreen = () => {
    const navigate = useNavigate()
    const {user, setUser} = useContext(AuthContext)
    const [classBtn, setClassBtn] = useState({
        post: true,
        favo: false
    }) 

    //codigo para simplificar
    const [dataPost, setDataPost] = useState([]);

    //funcion para traer post
    useEffect(() => {

        if(classBtn.post === true){
            const getPost = async() => {
            let dataArray = [];
            const docSnap = await getDocs(query(collection(db, "post"), where("user", "==", user.uid)));
            docSnap.forEach((doc) => {
                dataArray.push(doc.data())
            });
            setDataPost(dataArray);
            }
            getPost();
        }else{
            const getPost = async() => {
            let dataArray = [];
            const docSnap = await getDocs(query(collection(db, "post"), where("user", "==", user.uid)));
            docSnap.forEach((doc) => {
                dataArray.push(doc.data())
            });
            setDataPost(dataArray);
            }
            getPost();
    }
    }, [setDataPost, classBtn])

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
            <div className='box-username'  style={{backgroundColor: user.color}}>
                <p>{user.name.toUpperCase()}</p>
            </div>
            <div className='profile-post-favorites-container'>
                <div id='post' className={classBtn.post? 'btn-profile btn-active' : 'btn-profile'} onClick={handleChanceClass}>
                    POST
                </div>
                <div id='favo' className={classBtn.favo? 'btn-profile btn-active' : 'btn-profile'} onClick={handleChanceClass}>
                    FAVORITES
                </div>
            </div>
        </div>
        <div className="home-post-container">
            {
                dataPost.map(({name, color, date, content, like, user}) => (
                    <PostCard 
                    name={name} 
                    color={color}
                    date={date}
                    content={content}
                    like={like}
                    user={user}
                    />
                ))
            }
        </div>
    </div>
  )
}
