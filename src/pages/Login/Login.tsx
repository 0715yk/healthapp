import React, { useRef, useState, useCallback, ForwardedRef } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import SignUp from "../SignUp/SignUp";
import { useSetRecoilState } from "recoil";
import { loadingState, loginStatusState, userState } from "../../states";
import { customAxios } from "src/utils/axios";
import cookies from "react-cookies";
import axios from "axios";

const Login = React.forwardRef(({}, ref: ForwardedRef<HTMLDivElement>) => {
  const navigate = useNavigate();
  const setLoadingSpinner = useSetRecoilState(loadingState);
  const idRef = useRef<HTMLInputElement | null>(null);
  const pwdRef = useRef<HTMLInputElement | null>(null);
  const [modalOn, setModalOn] = useState({ on: false, message: "" });
  const setUserState = useSetRecoilState(userState);
  const setLoginStatusState = useSetRecoilState(loginStatusState);

  const signupRef = useRef<HTMLDivElement | null>(null);
  const signUpPage = () => {
    if (signupRef?.current) {
      signupRef.current.style.transitionDuration = "700ms";
      signupRef.current.style.transform = "translate(-100vw, 0)";
    }
  };

  const userLogin = useCallback(async () => {
    if (idRef?.current && pwdRef?.current) {
      const userIdInput = idRef.current.value;
      const passwordInput = pwdRef.current.value;

      try {
        setLoadingSpinner({ isLoading: true });
        const response = await customAxios.post("/users/login", {
          userId: userIdInput,
          password: passwordInput,
        });

        const { token, nickname } = response?.data;
        cookies.save("access_token", token, {
          path: "/",
        });

        setUserState({
          nickname,
        });
        setLoadingSpinner({ isLoading: false });
        setLoginStatusState("us");
        navigate("/main", {
          state: "login",
        });
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err?.response?.data?.message ??
            "서버 에러 입니다. 잠시후 다시 시도해주세요.";
          setLoadingSpinner({ isLoading: false });
          setModalOn({
            on: true,
            message: message,
          });
        }
      }
    }
  }, [navigate, setLoadingSpinner, setUserState, setLoginStatusState]);

  const closeModal = () => {
    setModalOn({ on: false, message: "" });
  };

  return (
    <div ref={ref} className={styles.loginPage}>
      <SignUp ref={signupRef} />
      <Modal modalOn={modalOn} closeModal={closeModal} />
      <header>Welcome to Strong</header>
      <main>
        <section className={styles.loginSection}>
          <h2>Id</h2>
          <input type="text" ref={idRef}></input>
        </section>
        <section className={styles.loginSection}>
          <h2>Password</h2>
          <input type="password" ref={pwdRef}></input>
        </section>
        <section className={styles.buttons}>
          <Link
            className={styles.linkBtn}
            onClick={(e) => {
              setLoadingSpinner({ isLoading: true });
              setLoginStatusState("kakao");
            }}
            to={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`}
          >
            <button className={styles.socialLogin}>Kakao Login </button>
          </Link>
          <Link
            className={styles.linkBtn}
            onClick={(e) => {
              setLoadingSpinner({ isLoading: true });
              setLoginStatusState("naver");
            }}
            to={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URL}&state=prod`}
          >
            <button className={styles.socialLoginNaver}>Naver Login </button>
          </Link>
          <button className={styles.glowBtn} onClick={userLogin}>
            Login
          </button>
          <button id={styles.signUpBtn} onClick={signUpPage}>
            Sign up
          </button>
        </section>
      </main>
    </div>
  );
});

export default Login;
