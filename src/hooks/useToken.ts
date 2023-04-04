import { useSetRecoilState } from "recoil";
import { userState } from "src/states";
import { useEffect } from "react";
import { customAxios } from "../utils/axios";
import { useNavigate } from "react-router-dom";

const useToken = () => {
  const setUserState = useSetRecoilState(userState);
  const navigate = useNavigate();
  const getUserInform = async () => {
    try {
      const response = await customAxios.get("/users");
      const { nickname } = response?.data;
      setUserState({
        nickname,
      });
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  useEffect(() => {
    void getUserInform();
  }, []);
};

export default useToken;
