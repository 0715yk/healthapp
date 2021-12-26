import React, { useRef, useState, useEffect } from "react";
import styles from "./SignUp.module.css";
import { useHistory } from "react-router-dom";
import { fbase } from "../..";
import Modal from "../../components/Modal/Modal";
import GlowBtn from "../../components/GlowBtn/GlowBtn";
import { duration } from "moment";

const SignUp = ({ setUser, signupRef }) => {
  const history = useHistory();
  const emailRef = useRef();
  const pwdRef = useRef();
  const nicknameRef = useRef();
  const [modalOn, setModalOn] = useState({ on: false, message: "" });

  const closeModal = () => {
    setModalOn({ on: false, message: "" });
  };

  const backBtn = () => {
    signupRef.current.style.transitionDuration = "1200ms";
    signupRef.current.style.transform = "translate(100vw, 0)";
  };

  const checkEmail = (email) => {
    var reg =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return reg.test(email);
  };

  const signup = () => {
    const email = emailRef.current.value;
    const password = pwdRef.current.value;
    const nickname = nicknameRef.current.value;
    if (email.replace(/ /g, "").length === 0) {
      setModalOn({ on: true, message: "Please enter email." });
      return;
    }
    if (password.replace(/ /g, "").length === 0) {
      setModalOn({ on: true, message: "Please enter password." });
      return;
    }
    if (!checkEmail(email)) {
      setModalOn({ on: true, message: "Invalid email format." });
      return;
    }
    if (password.length < 6) {
      setModalOn({
        on: true,
        message: "password is at least 6 letters.",
      });
      return;
    }
    var nicknameLen = nickname.replace(/ /g, "").length;
    if (nicknameLen < 2 || nicknameLen > 20) {
      setModalOn({
        on: true,
        message: "Nicknames are at least 2 letters to a maximum of 20 letters.",
      });

      return;
    }

    fbase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          email: email,
          displayName: nickname,
        });
        setUser({ nickname });
        history.push("/main");
      })
      .catch((response) => {
        if (response.code === "auth/invalid-email")
          setModalOn({
            on: true,
            message: "올바른 email 형식을 입력해주세요.",
          });
        else if (response.code === "auth/weak-password")
          setModalOn({
            on: true,
            message: "password는 최소 6글자 이상으로 작성해주세요.",
          });
        else if (response.code === "auth/email-already-in-use")
          setModalOn({
            on: true,
            message: "이미 가입된 이메일입니다.",
          });
      });
  };

  return (
    <div className={styles.signupPage} ref={signupRef}>
      <Modal modalOn={modalOn} closeModal={closeModal} />
      <button id={styles.backBtn} onClick={backBtn}>
        <i className="fas fa-chevron-left"></i>&nbsp;BACK
      </button>
      <header>Sign Up Form</header>
      <main>
        <section>
          <h2>Email</h2>
          <input type="email" ref={emailRef}></input>
        </section>
        <section>
          <h2>Password</h2>
          <input type="password" ref={pwdRef}></input>
        </section>
        <section>
          <h2>Nickname</h2>
          <input type="text" ref={nicknameRef}></input>
        </section>
        <section>
          <GlowBtn
            props={{
              func: signup,
              text: "Get Power",
            }}
          />
        </section>
      </main>
    </div>
  );
};

export default SignUp;
