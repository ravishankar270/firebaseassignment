
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
  const getPosts = async () => {
    const q=query(postsCollectionRef,where('author.email','==',user))
    const data = await getDocs(q);
    const d=[]
    data.forEach((blog)=>
    d.push({id:blog.id,data:blog.data()}))
    // setPostList(d.map((doc) => ({ ...doc, id: doc.id })));
    // console.log(d)
    setPostList(d)
    // console.log(postLists)
  };
  useEffect(() => {
    if (!auth1) {
      navigate("/login");
    }
    getPosts();
  }, []);

  const deleteBlog=(id)=>{
    // console.log('clicked')
    // console.log(id)
    // var blog = query(collection(db,'blogs'),where('_id','==',id));
    // getDocs(blog).then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //     console.log('hi')
    //     deleteDoc(doc);
    //     setDeleted(true)

  // });
  // console.log(id)
  const docRef=doc(db,'blogs',id)
  deleteDoc(docRef).then(
    ()=>{
      // console.log('deleted')
      getPosts()
      // window.location.href='/myblogs'
    }
  ).catch(
    (error)=>{
      console.log(error)
    }
  )

  }


    
  return (
    <>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-2'></div>
        <h1 style={{textAlign:'center'}}>My Blogs</h1>
        <div className='col-sm-8 mx-auto' style={{marginTop:'50px',display:'flex',justifyContent:"space-between",alignItems:'center'}}>
        
        <br></br>
    {postLists.length==0?
        <h1 style={{textAlign:'center',width:'75%'}}>None</h1>
      :
      postLists.map((post=>{
        return <Blog id={post.id} byme={true} title={post.data.title} content={post.data.postText} author={post.data.author.email} user={user} deleteBlog={deleteBlog}></Blog>
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