import Modal from "src/components/Modal/Modal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

let flag = false;
const DeleteAccount = () => {
  const [modalOn, setModalOn] = useState({ on: false, message: "" });
  const [cancelModalOn, setCancelModalOn] = useState(true);
  const [closeModalFunc, setCloseModalFunc] = useState(() => {});
  const navigate = useNavigate();
  const onDeleteAccount = () => {
    const closeModal = () => {
      console.log("회원탈퇴 진행");
      // 탈퇴 api 호출
      setCancelModalOn(false);

      const finishProcess = () => {
        flag = true;
        navigate("/");
      };

      setCloseModalFunc(finishProcess);

      setModalOn({
        on: true,
        message:
          "그동안 이용해주셔서 감사합니다. 5초 후에 랜딩 페이지로 이동합니다.",
      });
      setTimeout(() => {
        if (!flag) {
          finishProcess();
        }
      }, 5000);
    };

    setCloseModalFunc(closeModal);
    setModalOn({
      on: true,
      message:
        "회원 탈퇴를 하시면 이전까지의 운동기록이 모두 삭제됩니다. 진행하시겠습니까?",
    });
  };

  useEffect(() => {}, []);

  const cancelModal = () => {
    setModalOn({
      on: false,
      message: "",
    });
  };

  return (
    <>
      <Modal
        modalOn={modalOn}
        closeModal={closeModalFunc}
        cancelModalOn={cancelModalOn}
        cancelModal={cancelModal}
      />
      <button onClick={onDeleteAccount}>Delete Account</button>
    </>
  );
};

export default DeleteAccount;
