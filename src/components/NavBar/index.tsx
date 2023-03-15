import { useHistory } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = ({ children }) => {
  const history = useHistory();

  const setNavigation = (url: string) => {
    history.push(url);
  };

  return (
    <>
      {children}
      <nav className={styles.navBar}>
        <button
          className={styles.navBtns}
          onClick={() => setNavigation("/main")}
        >
          HOME
        </button>
        <button
          className={styles.navBtns}
          onClick={() => setNavigation("/main")}
        >
          ABOUT
        </button>
        <button
          className={styles.navBtns}
          onClick={() => setNavigation("/main")}
        >
          PROFILE
        </button>
      </nav>
    </>
  );
};

export default NavBar;
