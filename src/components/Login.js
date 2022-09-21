import React, { useState } from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

function Login({ setUser, setAuth }) {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    if (!email || !password) {
      toast.error("fields are missing!");
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", user.user.email);

      setAuth(true);
      setUser(user.user.email);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error("no user found");
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      localStorage.setItem("user", result.user.email);
      setAuth(true);
      setUser(result.user.email);
      navigate("/");
    });
  };
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <ToastContainer position="top-center" />
      <div className="container">
        <div className="row mx-auto">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={(event) => setEmail(event.target.value)}
                id="outlined-basic1"
                type="email"
                label="Email"
                variant="outlined"
                style={{ width: "100%" }}
              />
              <br></br>
              <TextField
                onChange={(event) => setPassword(event.target.value)}
                id="outlined-basic2"
                type="password"
                style={{ width: "100%" }}
                label="password"
                variant="outlined"
              />
              <Stack spacing={2}  direction="row">
                <Button
                  variant="contained"
                  onClick={signIn}
                  style={{ width: "100%" }}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/signup")}
                  style={{ width: "100%" }}
                >
                  Sign Up
                </Button>
              </Stack>
            </Box>
            <span
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
              }}
            >
              OR
            </span>
            <a
              style={{
                border: "0.2px solid grey",
                width: "100%",
                marginLeft: "8px",
              }}
              class="btn btn-lg btn-google btn-block text-uppercase btn-outline"
              onClick={signInWithGoogle}
            >
              <img src="https://img.icons8.com/color/16/000000/google-logo.png" />{" "}
              Sign In Using Google
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
