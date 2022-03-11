import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../auth/AuthContext'

import {db} from '../../firebase/firebase'
import { getAuth } from '@firebase/auth';
import { addDoc, collection, doc, getDocs, updateDoc} from "firebase/firestore";

import { useNavigate } from 'react-router-dom';
import { PostCard } from '../postcard/PostCard';
import '../../styles/homeScreen.css'
import { LoadingScreen } from '../loading/LoadingScreen';
  
export const HomeScreen = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  const [form, setForm] = useState("")
  const [barProgress, setbarProgress] = useState(0)
  const [loadingPost, setloadingPost] = useState(true)
  const [formBlock, setFormBlock] = useState(false)

  //codigo para simplificar
  const [dataPost, setDataPost] = useState([]);
  
  //funcion para traer post
  useEffect(() => {
    const getPost = async() => {
      let dataArray = [];
      const docSnap = await getDocs(collection(db, "post"));
      docSnap.forEach((doc) => {
        dataArray.push(doc.data())
      });
      setDataPost(dataArray);
      setloadingPost(false);
    }
    getPost();
  }, [setDataPost, setloadingPost])
  

  //Fucnion para agregar post
  const handleAddPost = async(e) => {
    setFormBlock(true);
    e.preventDefault()
    const {uid} = getAuth().currentUser;
    try{
      const docRef = await addDoc(collection(db, "post"), {
        color: user.color,
        name: user.name,
        content: form,
        user: uid,
        date: new Date().getTime(),
        like: []
      });
      await updateDoc(doc(db, "post", `${docRef.id}`), {
        id: docRef.id
      })
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setFormBlock(false);
    setForm('');
    setbarProgress(0);
  }

  

  const handelInputChange = ({target}) => {
    setForm(target.value);
    setbarProgress(target.value.length/2);
  }
  const handleClickProfile = () =>{
    navigate('/devs-app-fullstack/profile',
      {replace: true})
  }

  console.log(loadingPost);
  //Todo: hacer borde de color que escoja el usuario
  return (
    <div className='home-main-container'>
        <div className='home-header-container'>
            <img 
              className='img-header' 
              src="./img/ornacia.png" 
              alt="ornacia"
              style={{borderColor: user.color}}
              onClick={handleClickProfile}
            />
            <img className='logo-header' src="./img/logo.png" alt="./img/logo"/>
            <img className='letter-header' src="./img/letterlogo.png" alt="./img/letterlogo" />
        </div>

        {formBlock && <div className='black-form' />}

        <div className='home-back'>
          <div className='form-container'>
            <img src="./img/ornacia.png" alt="./img/ornacia.png" />
            <form onSubmit={handleAddPost} className='home-text-button-container'>
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
              <button className={formBlock? "active-btn" : "off-btn"} onClick={handleAddPost}>POST</button>
            </form>
          </div>
        </div>

        {
          !loadingPost?
            <div className='home-post-container'>
              {
                dataPost.map(({name, color, date, content, like, user, id}) => (
                  <PostCard 
                    name={name} 
                    color={color}
                    date={date}
                    content={content}
                    like={like}
                    user={user}
                    key={id}
                    id={id}
                    dataPost={dataPost}
                    setDataPost={setDataPost}
                  />
                ))
              }
            </div>
          :
          <LoadingScreen />
        }

    </div>
  )
}