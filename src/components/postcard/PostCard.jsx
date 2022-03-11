import React from 'react'
import moment from 'moment';

import { getAuth } from '@firebase/auth';


import '../../styles/postCard.css'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const PostCard = ({name, color, date, content, like, user, id, setDataPost, dataPost}) => {
    const {uid} = getAuth().currentUser;      

    //Socket para escuchar actualicaciones en database
    const updateData = () => {
        onSnapshot(doc(db, "post", `${id}`), (doc) => {
            const index = dataPost.findIndex(elem => elem.id === id);
            const post = dataPost[index];
            const postEdit = {...post, like: doc.data().like}
            const newArray = dataPost.slice();
            newArray.splice(index, 1, postEdit)
            setDataPost(newArray)

        });
    }

    //funcion para Like
    const hadleLikePost = () => {
        if(like.includes(uid)){
            //Elimina el like
            const newLike = like.slice();
            newLike.splice(like.findIndex(elem => elem === uid))
            updateDoc(doc(db, "post", `${id}`), {like: newLike})
        }else {
            //Dar Like
            updateDoc(doc(db, "post", `${id}`), {like: [...like, uid]})
        }
        updateData();
    }


    return (
        <div className='main-container'>
            <img className='img-ornacia' src='./img/ornacia.png' alt='ornacia.png'/>
            <div className="post-username-main-container">
                <div className="user-date-delete-container">
                    <div className="user-date">
                        <div className='box-username-post' style={{backgroundColor: color}}>{name}</div>
                        <p>{moment(date).format('- D MMM.')}</p>
                    </div>
                    {
                        (uid===user)? <img src='./img/Vector.png' alt='delete'/> : <></>
                    }
                </div>
                <p className="content-text">
                    {content}
                </p>
                <div className="like-container" onClick={hadleLikePost}>
                    {
                        (like.includes(uid))? 
                        (
                            <>
                                <img src="./img/like.png" alt="no-like" />
                                <p style={{color: "#F50D5A"}}>{like.length}</p>
                            </>
                        ):
                        (
                            <>
                                <img src="./img/no-like.png" alt="no-like" />
                                <p>{like.length}</p>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
