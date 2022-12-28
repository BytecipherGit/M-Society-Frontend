import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../common/constants";
import Logo from "../../static/images/dashboard-logo.png";

export const SidebarView = ({ menu }) => {
  const navigate = useNavigate();

  return (
    <div className="side">
      <div className="toggle-wrap">
        <span className="toggle-bar"></span>
      </div>
      <aside>
        <div className="aside-logo">
          <img
            src={Logo}
            alt="Logo"
            onClick={() => {
              navigate("/dashboard");
            }}
          />
        </div>
        <li
          className={window.location.pathname === "/dashboard" ? "active" : ""}
        >
          <button
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            {DASHBOARD}
          </button>
        </li>
        <li
          className={
            window.location.pathname === "/society" ||
            window.location.pathname === "/add-society" ||
            window.location.pathname === "/view-society" ||
            window.location.pathname === "/edit-society"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/society");
            }}
          >
            Society
          </button>
        </li>
        <li
          className={
            window.location.pathname === "/designation" ||
            window.location.pathname === "/add-designation" ||
            window.location.pathname === "/view-designation" ||
            window.location.pathname === "/edit-designation"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/designation");
            }}
          >
            Designation
          </button>
        </li>
      </aside>
    </div>
  );
};
