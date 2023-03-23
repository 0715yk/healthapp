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
      <div className={styles.bodyPart}>
        <div className={styles.contents}>
          <NicknameInput />
          <PasswordInput />
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
