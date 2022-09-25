
import Blog from './Blog'
import React, { useEffect, useState } from "react"
import { getDocs, collection, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import {useNavigate} from 'react-router-dom'
import { Audio } from 'react-loader-spinner';

function Home({auth1,user}) {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "blogs");
  const [deleted,setDeleted]=useState(false)
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
      
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(postLists)
    };
    getPosts();
  }, []);

  // const deleteBlog=(id)=>{
  //   console.log('clicked')
  //   console.log(id)
  //   // var blog = query(collection(db,'blogs'),where('_id','==',id));
  //   // getDocs(blog).then(function(querySnapshot) {
  //   //   querySnapshot.forEach(function(doc) {
  //   //     console.log('hi')
  //   //     deleteDoc(doc);
  //   //     setDeleted(true)

  // // });
  // const docRef=doc(db,'blogs',id)
  // deleteDoc(docRef).then(
  //   ()=>{
  //     console.log('deleted')
  //   }
  // ).catch(
  //   (error)=>{
  //     console.log(error)
  //   }
  // )

  // }

  
  return (
    <>
    
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-2'></div>
        <div className='col-sm-8 mx-auto' style={{marginTop:'50px',display:'flex',flexDirection:'column',margin:'20px',justifyContent:"space-between",alignItems:'center'}}>
        <h2>All Blogs</h2>
    {postLists.length==0?
        <Audio
          height="150"
          width="150"
          radius="15"
          color="black"
          ariaLabel = 'three-dots-loading'
          wrapperStyle={{
              width: '100px',
              height: '100px',
              
              position: 'absolute',
              top:0,
              bottom: 0,
              left: 0,
              right: 0,
              
              margin: 'auto',
          }}
          wrapperClass 
      />
      :
      postLists.map((post=>{
        return <div style={{display:'flex',flexDirection:'column',width:'100%'}} className='row'><Blog id={post.id} title={post.title} content={post.postText} author={post.author.email} user={user} deleteBlog={false}></Blog></div>
      }))
    }
    </div>
    <div className='col-sm-2'></div>
    </div>
    </div>
    </>
    
  )
}

export default Home;