import GlowHeader from "../../components/GlowHeader/GlowHeader";
import DeleteAccount from "./DeleteAccount";
import NicknameInput from "./NicknameInput";
import cookies from "react-cookies";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import {
  latestWorkoutDateState,
  latestWorkoutState,
  loadingState,
  loginStatusState,
  userState,
} from "src/states";
import useCheckToken from "src/hooks/useCheckToken";
import Modal from "src/components/Modal/Modal";
import { useState, useCallback } from "react";
import { customAxios } from "src/utils/axios";

const Profile = () => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useRecoilState(loginStatusState);
  const resetLatestWorkout = useResetRecoilState(latestWorkoutState);
  const resetLatestWorkoutDate = useResetRecoilState(latestWorkoutDateState);
  const setLoadingSpinner = useSetRecoilState(loadingState);
  const setUserState = useSetRecoilState(userState);
  const [modalOn, setModalOn] = useState({ on: false, message: "" });
  const onLogout = () => {
    setModalOn({ on: true, message: "정말 로그아웃 하시겠습니까?" });
  };

  useCheckToken();

  const cancelModal = () => {
    setModalOn({ on: false, message: "" });
  };

  const closeModal = useCallback(async () => {
    // 여기서 소셜 로그인인 경우에는 api를 호출해야할듯
    setLoadingSpinner({ isLoading: true });
    if (loginState === "kakao") {
      try {
        await customAxios.get("/users/kakaoLogout");
        setModalOn({ on: false, message: "" });
        setUserState({ nickname: "" });
        cookies.remove("access_token", { path: "/" });
        setLoginState("us");
        setLoadingSpinner({ isLoading: false });
        navigate("/");
      } catch (e) {
        setLoadingSpinner({ isLoading: false });
        console.log(e);
      }
    } else if (loginState === "us") {
      // 일반 로그인
      setModalOn({ on: false, message: "" });
      setUserState({ nickname: "" });
      cookies.remove("access_token", { path: "/" });
      setLoadingSpinner({ isLoading: false });
      navigate("/");
    }
    resetLatestWorkout();
    resetLatestWorkoutDate();
  }, [
    resetLatestWorkoutDate,
    setLoadingSpinner,
    resetLatestWorkout,
    setLoginState,
    loginState,
    setUserState,
    setModalOn,
    navigate,
  ]);

  return (
    <div className={styles.profilePage}>
      <Modal
        cancelModalOn={true}
        modalOn={modalOn}
        closeModal={closeModal}
        cancelModal={cancelModal}
      />
      <GlowHeader
        title={"Profile"}
        style={{
          fontSize: "13vw",
          textAlign: "left",
          marginLeft: "15px",
          paddingTop: "40px",
        }}
      />
      <div className={styles.bodyPart}>
        <div className={styles.contents}>
          <NicknameInput />
          {/* <PasswordInput /> */}
          <button className={styles.logoutbtn} onClick={onLogout}>
            Logout
          </button>
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
};

export default Profile;
