import React from "react";
import moment from "moment";

import { getAuth } from "@firebase/auth";

import "../../styles/postCard.css";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Swal from "sweetalert2";

export const PostCard = ({
  name,
  color,
  date,
  content,
  like,
  user,
  id,
  setDataPost,
  dataPost,
}) => {
  const { uid } = getAuth().currentUser;

  //Socket para escuchar actualicaciones en database
  const updateDataLike = () => {
    onSnapshot(doc(db, "post", `${id}`), (doc) => {
      const index = dataPost.findIndex((elem) => elem.id === id);
      const post = dataPost[index];
      const postEdit = { ...post, like: doc.data().like };
      const newArray = dataPost.slice();
      newArray.splice(index, 1, postEdit);
      setDataPost(newArray);
    });
  };
  const updateDataDelete = () => {
    onSnapshot(doc(db, "post", `${id}`), (doc) => {
      const index = dataPost.findIndex((elem) => elem.id === id);
      const newArray = dataPost.slice();
      newArray.splice(index, 1);
      setDataPost(newArray);
    });
  };

  //funcion para Like
  const hadleLikePost = () => {
    if (like.includes(uid)) {
      //Elimina el like
      const newLike = like.slice();
      newLike.splice(like.findIndex((elem) => elem === uid));
      updateDoc(doc(db, "post", `${id}`), { like: newLike });
    } else {
      //Dar Like
      updateDoc(doc(db, "post", `${id}`), { like: [...like, uid] });
    }
    updateDataLike();
  };

  const handleDeletePost = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        updateDataDelete();
        deleteDoc(doc(db, "post", `${id}`));
      }
    });
  };

  return (
    <div className="main-container">
      <img className="img-ornacia" src="./img/ornacia.png" alt="ornacia.png" />
      <div className="post-username-main-container">
        <div className="user-date-delete-container">
          <div className="user-date">
            <div
              className="box-username-post"
              style={{ backgroundColor: color }}
            >
              {name}
            </div>
            <p>{moment(date).format("- D MMM.")}</p>
          </div>
          {uid === user ? (
            <img
              src="./img/Vector.png"
              alt="delete"
              onClick={handleDeletePost}
            />
          ) : (
            <></>
          )}
        </div>
        <p className="content-text">{content}</p>
        <div className="like-container" onClick={hadleLikePost}>
          {like.includes(uid) ? (
            <>
              <img src="./img/like.png" alt="no-like" />
              <p style={{ color: "#F50D5A" }}>{like.length}</p>
            </>
          ) : (
            <>
              <img src="./img/no-like.png" alt="no-like" />
              <p>{like.length}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
