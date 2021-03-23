import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 150) {
        handleShow(true);
      } else handleShow(false);
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      {/* src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZ3Ydl1ltcFU_ykQDmN_wsrF0uDgfEkVsa0bGTC3DJpaYpKRdGVF_YCVaWAq28rOoJiE&usqp=CAU" */}
      <img
        className="nav__Avatar"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Neetflix Avatar"
      />
    </div>
  );
}

export default Nav;
