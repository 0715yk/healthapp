import React, { useRef, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import SignUp from "../SignUp/SignUp";
import { useSetRecoilState } from "recoil";
import { userState } from "../../states";

const Login = React.forwardRef(({}, ref) => {
  const navigate = useNavigate();
  const idRef = useRef();
  const pwdRef = useRef();
  const [modalOn, setModalOn] = useState({ on: false, message: "" });

  const setUserState = useSetRecoilState(userState);

  const signupRef = useRef();
  const signUpPage = () => {
    signupRef.current.style.transitionDuration = "700ms";
    signupRef.current.style.transform = "translate(-100vw, 0)";
  };
  const userLogin = () => {
    var id = idRef.current.value;
    var password = pwdRef.current.value;
    // 여기서 api 호출하고 호출 결과에 따른 메시지를 Modal로 보여줌
    navigate("/main");
  };

  const anonymousLogin = async () => {};

  const closeModal = () => {
    setModalOn({ on: false, message: "" });
  };

  return (
    <div ref={ref} className={styles.loginPage}>
      <SignUp ref={signupRef} />
      <Modal modalOn={modalOn} closeModal={closeModal} />
      <header>Welcome to Strong</header>
      <main>
        <section>
          <h2>Id</h2>
          <input type="text" ref={idRef}></input>
        </section>
        <section>
          <h2>Password</h2>
          <input type="password" ref={pwdRef}></input>
        </section>
        <section className={styles.buttons}>
          <button className={styles.glowBtn} onClick={userLogin}>
            Login
          </button>
          {/* <button className={styles.glowBtn} onClick={anonymousLogin}>
            Guest Login
          </button> */}
          <button id={styles.signUpBtn} onClick={signUpPage}>
            Sign up
          </button>
        </section>
      </main>
    </div>
  );
});

export default Login;
