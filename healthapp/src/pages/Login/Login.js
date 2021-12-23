import React, { useRef, useState } from "react";
import styles from "./Login.module.css";
import { useHistory } from "react-router-dom";
import { fbase } from "../..";
import Modal from "../../components/Modal/Modal";
import SignUp from "../SignUp/SignUp";

const Login = ({ scrollRef, setUser }) => {
  const history = useHistory();
  const emailRef = useRef();
  const pwdRef = useRef();
  const [modalOn, setModalOn] = useState({ on: false, message: "" });
  const signupRef = useRef();
  const signUpPage = () => {
    signupRef.current.style.transitionDuration = "700ms";
    signupRef.current.style.transform = "translate(-100vw, 0)";
  };
  const userLogin = () => {
    var email = emailRef.current.value;
    var password = pwdRef.current.value;
    fbase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser({
          nickname: response.user.displayName,
          email: response.user.email,
        });
        history.push("/main");
      })
      .catch((res) => {
        if (res.code === "auth/wrong-password")
          setModalOn({
            on: true,
            message: "wrong password",
          });
        else if (res.code === "auth/invalid-email")
          setModalOn({ on: true, message: "Invalid email format." });
        else if (res.code === "auth/user-not-found")
          setModalOn({ on: true, message: "email not found" });
      });
  };

  const anonymousLogin = async () => {
    console.log(fbase.auth().currentUser);
  };

  const closeModal = () => {
    setModalOn({ on: false, message: "" });
  };
  return (
    <div ref={scrollRef} className={styles.loginPage}>
      <SignUp setUser={setUser} signupRef={signupRef} />
      <Modal modalOn={modalOn} closeModal={closeModal} />
      <header>Welcome to Strong</header>
      <main>
        <section>
          <h2>Email</h2>
          <input type="email" ref={emailRef}></input>
        </section>
        <section>
          <h2>Password</h2>
          <input type="password" ref={pwdRef}></input>
        </section>
        <section className={styles.buttons}>
          <button className={styles.glowBtn} onClick={userLogin}>
            User Login
          </button>

          <button className={styles.glowBtn} onClick={anonymousLogin}>
            Guest Login
          </button>
          <button id={styles.signUpBtn} onClick={signUpPage}>
            Sign up
          </button>
        </section>
      </main>
    </div>
  );
};

export default Login;
