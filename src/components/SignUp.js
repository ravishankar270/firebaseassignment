import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {auth} from '../firebase-config'
import {
  createUserWithEmailAndPassword,
  
} from "firebase/auth";

function SignUp({setUser,setAuth}) {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [cpassword,setCpassword]=useState('')
  let navigate = useNavigate();
  const signUp= async ()=>{
    if (!email || !password || !cpassword){
      toast.error("fields are missing!");
      return;
    }
    if(password!==cpassword){
      toast.error("password does not match!");
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);
      setAuth(true)
      setUser(user.user.email)
      localStorage.setItem('isAuth',true)
      localStorage.setItem('user',user.user.email)
      navigate('/')
    } catch (error) {
      console.log(error.message);
    }
  }
  // useEffect(()=>{
  //   if(auth1){
  //     navigate('/')
  //   }
  // },[])

  return (
    <div className="container">
      <ToastContainer position="top-center" />
      <div className="row">
        <div className="col-sm-7 mx-auto">
          {/* <form class="login"> */}
            
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                required
                type="email"
                name="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(event)=>setEmail(event.target.value)}
              />

              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                required
                name="password"
                type="password"
                minLength='6'
                class="form-control"
                id="exampleInputPassword1"
                onChange={(event)=>setPassword(event.target.value)}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Confirm Password
              </label>
              <input
                required
                name="cpassword"
                type="password"
                minLength='6'
                class="form-control"
                id="exampleInputPassword1"
                onChange={(event)=>setCpassword(event.target.value)}
              />
            </div>
            {password!==cpassword?
              <div class="alert alert-danger" role="alert">
              Password does not match
            </div>
            :
            <></>  
          }
            <button onClick={signUp} class="btn btn-primary">
              Sign Up
            </button>
            <span class="signup">
              Already have an account<Link to="/login">Sign In!</Link>{" "}
            </span>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
