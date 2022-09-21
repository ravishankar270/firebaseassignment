import React from 'react'
import {useState,useEffect} from 'react'
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateBlog({auth1}) {
  
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "blogs");
  let navigate = useNavigate();
  console.log(auth)
  const createPost = async () => {
    if(!title || !postText){
      toast.error("fields are missing!")
      return
    }
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { email: auth.currentUser.email, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!auth1) {
      navigate("/login");
    }

  }, []);
  return (
<div className="createPostPage">
<ToastContainer position="top-center"/>
      <div className="cpContainer">
        <h1>Create A Blog</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            required
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Blog:</label>
          <textarea
          required
            placeholder="Blog..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>

        <div className="inputGp">
          <label> Image</label>
          <input 
          required
          type="file" 
          id="img" 
          name="img" 
          accept="image/*"
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <Button onClick={createPost} variant="contained" style={{width:'100%'}}>Submit blog</Button>
      </div>
    </div>
  )
}

export default CreateBlog