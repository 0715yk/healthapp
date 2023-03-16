import GlowHeader from "../../components/GlowHeader/GlowHeader";
import DeleteAccount from "./DeleteAccount";
import NicknameInput from "./NicknameInput";
import PasswordInput from "./PasswordInput";
import styles from "./style.module.css";
const Profile = () => {
  const onLogout = () => {
    console.log("logout api");
  };

  return (
    <div className={styles.profilePage}>
      <GlowHeader
        title={"Profile"}
        style={{
          fontSize: "13vw",
          textAlign: "left",
          marginLeft: "15px",
          paddingTop: "20px",
        }}
      />
      <NicknameInput />
      <PasswordInput />
      <button onClick={onLogout}>Logout</button>
      <DeleteAccount />
    </div>
  );
};

export default Profile;
