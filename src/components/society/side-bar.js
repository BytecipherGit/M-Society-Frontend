import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../common/constants";
import Logo from "../../static/images/dashboard-logo.png";

export const SocietySidebarView = ({ menu }) => {
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
              navigate("/society-dashboard");
            }}
          />
        </div>
        <li
          className={
            window.location.pathname === "/society-dashboard" ? "active" : ""
          }
        >
          <button
            onClick={() => {
              navigate("/society-dashboard");
            }}
          >
            {DASHBOARD}
          </button>
        </li>
        <li
          className={
            window.location.pathname === "/residential-user" ||
            window.location.pathname === "/view-residential-user"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/residential-user");
            }}
          >
            Residential Users
          </button>
        </li>
        <li
          className={
            window.location.pathname === "/phone-directory" ||
            window.location.pathname === "/add-phone-directory" ||
            window.location.pathname === "/view-phone-directory" ||
            window.location.pathname === "/edit-phone-directory"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/phone-directory");
            }}
          >
            Phone Directories
          </button>
        </li>
        <li
          className={
            window.location.pathname === "/notice" ||
            window.location.pathname === "/add-notice" ||
            window.location.pathname === "/view-notice" ||
            window.location.pathname === "/edit-notice"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/notice");
            }}
          >
            Notice
          </button>
        </li>

        <li
          className={
            window.location.pathname === "/complaint" ||
            window.location.pathname === "/view-complaint"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/complaint");
            }}
          >
            Complaints
          </button>
        </li>

        <li
          className={
            window.location.pathname === "/document" ||
            window.location.pathname === "/add-document" ||
            window.location.pathname === "/view-document" ||
            window.location.pathname === "/edit-document"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/document");
            }}
          >
            Documents
          </button>
        </li>
      </aside>
    </div>
  );
};
