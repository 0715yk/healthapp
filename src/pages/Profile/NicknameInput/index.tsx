import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRecoilState } from "recoil";
import { userState } from "src/states";
import Modal from "src/components/Modal/Modal";
import { validateUserNickname, NICKNAME_VALIDATION_MESSAGE } from "src/utils";

const NicknameInput = ({}) => {
  const [nicknameInput, setNicknameInput] = useState("");
  const [userInform, setUserInform] = useRecoilState(userState);
  const [modalOn, setModalOn] = useState({ on: false, message: "" });
  const divRef = useRef(null);

  const updateUserInform = useCallback(() => {
    const nickname = userInform.nickname;

    if (nickname) {
      setNicknameInput(nickname);
    }
  }, [userInform.nickname]);

  useEffect(() => {
    updateUserInform();

    const ref = divRef.current;

    document.addEventListener(
      "click",
      (e) => {
        if (ref.contains(e.target)) {
          return;
        } else {
          updateUserInform();
        }
      },
      true
    );

    return () => {
      document.removeEventListener(
        "click",
        (e) => {
          if (ref.contains(e.target)) {
            return;
          } else {
            updateUserInform();
          }
        },
        true
      );
    };
  }, [updateUserInform]);

  const onChangeEvent = (e: React.onChangeEvent) => {
    const text = e.target.value;
    setNicknameInput(text);
  };

  const onClickEvent = useCallback(
    (e: React.onClickEvent) => {
      // 여기서 유효성 검사가 통과하면 api 호출 아니면 Modal 호출
      const resultCode = validateUserNickname(nicknameInput);
      if (nicknameInput === userInform.nickname) {
        setModalOn({
          on: true,
          message: "동일한 닉네임으로는 변경할 수 없습니다.",
        });
        return;
      }

      const message = NICKNAME_VALIDATION_MESSAGE[resultCode];
      if (message === "") {
        // api 호출
        setModalOn({ on: true, message: "성공적으로 수정됐습니다." });
        setUserInform((prev) => {
          return {
            ...prev,
            nickname: nicknameInput,
          };
        });
      } else {
        setModalOn({ on: true, message: message });
        return;
      }
    },
    [nicknameInput, setUserInform, userInform.nickname]
  );

  const closeModal = () => {
    setModalOn({ on: false, message: "" });
  };

  return (
    <div ref={divRef}>
      <Modal modalOn={modalOn} closeModal={closeModal} />
      <input type="text" value={nicknameInput} onChange={onChangeEvent} />
      <button onClick={onClickEvent}>수정</button>
    </div>
  );
};

export default NicknameInput;
