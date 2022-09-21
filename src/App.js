import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import CreateBlog from './components/CreateBlog';
import Login from './components/Login';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import { useState } from 'react';
import {signOut} from 'firebase/auth'
import { auth } from './firebase-config';
import MyBlogs from './components/MyBlogs'

function App() {
  const [isAuth,setAuth]=useState(localStorage.getItem("isAuth"))
  const [user,setUser]=useState(localStorage.getItem('user'))
  const signUserOut=()=>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setAuth(false)
      window.location.pathname='/login'
    })
  }
  return (
    <Router>
      <NavBar user={user} auth={isAuth} signout={signUserOut}/>
      <Routes>
        <Route path='/' element={<Home auth1={isAuth} user={user}/>} />
        <Route path='/login' element={<Login setUser={setUser} setAuth={setAuth}/>} />
        <Route path='/signup' element={<SignUp setUser={setUser} setAuth={setAuth} />} />
        <Route path='/createBlog' element={<CreateBlog auth1={isAuth}/>} />
        <Route path='/myblogs' element={<MyBlogs auth1={isAuth} user={user}/>} />
      
      </Routes>
    </Router>
  );
}

export default App;
