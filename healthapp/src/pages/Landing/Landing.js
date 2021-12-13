import React, { useEffect, useRef } from "react";
import styles from "./Landing.module.css";
import Login from "../Login/Login";
import smoothscroll from "smoothscroll-polyfill";

// kick off the polyfill!

const Landing = ({ setUser }) => {
  const scrollRef = useRef(null);
  const buttonRef = useRef(null);
  const upperRef = useRef(null);
  const lowerRef = useRef(null);

  const startFunc = () => {
    upperRef.current.style.transform = "translate(-100vw,0)";
    lowerRef.current.style.transform = "translate(100vw,0)";
    buttonRef.current.style.transform = "translate(100vw,0)";
    scrollRef.current.style.transform = "translate(0,-100vh)";
  };

  useEffect(() => {
    upperRef.current.style.transform = "translate(100vw,0)";
    lowerRef.current.style.transform = "translate(-100vw,0)";
    setTimeout(() => {
      buttonRef.current.style.transform = "translate(0,-100vh)";
    }, 800);
  }, []);

  return (
    <div className={styles.frame}>
      <div className={styles.landingPage}>
        <header>
          <div ref={upperRef} className={styles.upperTitle}>
            Progressive
          </div>
          <div ref={lowerRef} className={styles.lowerTitle}>
            Overload
          </div>
        </header>
        <section>
          <button onClick={startFunc} ref={buttonRef}>
            Start
          </button>
        </section>
      </div>
      <Login scrollRef={scrollRef} setUser={setUser} />
    </div>
  );
};

export default Landing;
