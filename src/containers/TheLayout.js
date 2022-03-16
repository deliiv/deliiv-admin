import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TheLayout = () => {
  const darkMode = useSelector((state) => state.UI.darkMode);
  const classes = classNames(
    "c-app c-default-layout",
    // darkMode && "c-dark-theme"
  );

  return (
    <div className={classes}>
      <TheSidebar />
      {/* <TheAside/> */}
      <div className="c-wrapper">
        <TheHeader />
        <ToastContainer />
        <div className="c-body">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
