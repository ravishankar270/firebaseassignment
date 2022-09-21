
import Blog from './Blog'
import React, { useEffect, useState } from "react"
import { getDocs, collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import {useNavigate} from 'react-router-dom'
import { Audio } from 'react-loader-spinner';

function MyBlogs({auth1,user}) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "blogs");
  let navigate = useNavigate();
  // const deletePost = async (id) => {
  //   const postDoc = doc(db, "posts", id);
  //   await deleteDoc(postDoc);
  // };
  useEffect(() => {
    if (!auth1) {
      navigate("/login");
    }
    const getPosts = async () => {
        const q=query(postsCollectionRef,where('author.email','==',user))
      const data = await getDocs(q);
      const d=[]
      data.forEach((blog)=>
      d.push(blog.data()))
      setPostList(d.map((doc) => ({ ...doc, id: doc.id })));
      console.log(postLists)
    };
    getPosts();
  }, []);

    
  return (
    <>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-2'></div>
        <div className='col-sm-8 mx-auto' style={{marginTop:'50px',display:'flex',justifyContent:"space-between",alignItems:'center'}}>
        <h1>My Blogs</h1>
        <br></br>
    {postLists.length==0?
        <h1>None</h1>
      :
      postLists.map((post=>{
        return <Blog byme={true} title={post.title} content={post.postText} author={post.author.email} user={user}></Blog>
      }))
    }
    </div>
    <div className='col-sm-2'></div>
    </div>
    </div>
    </>
    
  )
}

export default MyBlogs;