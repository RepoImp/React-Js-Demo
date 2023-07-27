import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { actions } from "../../redux/store/store";
import { useLogoutMutation } from "../../api/auth";

const Header = () => {
  const loc = useLocation();
  const [logout] = useLogoutMutation();
  const { firstName, lastName } = useSelector(
    (state) => state.auth.currentUser || {}
  );
  const performLogout = useCallback(
    async (e) => {
      e.preventDefault();
      logout();
      actions.auth.setCurrentUser(null);
    },
    [logout]
  );

  return (
    ![
      "/login",
      "/register",
      "/confirmation",
      "/forgotPassword",
      "/resetPassword",
    ].includes(loc.pathname) && (
      <nav className="main-header navbar navbar-expand navbar-white">
        <span
          className="nav-link"
          data-widget="pushmenu"
          style={{
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <i className="fas fa-bars" />
        </span>
        <h3
          style={{
            textTransform: "capitalize",
            marginBottom: "0",
          }}
        >
          Welcome to better truck [{firstName ? firstName : " "}{" "}
          {lastName ? lastName : ""}]
        </h3>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <span
              style={{ border: "none", color: "black", fontWeight: "normal" }}
              href=""
              className="btn"
              onClick={performLogout}
            >
              <BiLogOut className="icon_logout" /> Log out
            </span>
          </li>
        </ul>
      </nav>
    )
  );
};

export default Header;
