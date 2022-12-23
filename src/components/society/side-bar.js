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
            window.location.pathname === "/residential-user-listing" ||
            window.location.pathname === "/view-residential-user-detail"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/residential-user-listing");
            }}
          >
            Residential User
          </button>
        </li>
        <li
          className={
            window.location.pathname === "/phone-directory-listing" ||
            window.location.pathname === "/add-phone-directory" ||
            window.location.pathname === "/view-phone-directory-detail" ||
            window.location.pathname === "/edit-phone-directory"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/phone-directory-listing");
            }}
          >
            Phone Directory
          </button>
        </li>
        <li
          className={
            window.location.pathname === "/notice-listing" ||
            window.location.pathname === "/add-notice" ||
            window.location.pathname === "/view-notice-detail" ||
            window.location.pathname === "/edit-notice"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/notice-listing");
            }}
          >
            Notice
          </button>
        </li>

        <li
          className={
            window.location.pathname === "/complaint-listing" ||
            window.location.pathname === "/view-complaint-detail"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/complaint-listing");
            }}
          >
            Complaint
          </button>
        </li>

        <li
          className={
            window.location.pathname === "/document-listing" ||
            window.location.pathname === "/add-document" ||
            window.location.pathname === "/view-document-detail" ||
            window.location.pathname === "/edit-document"
              ? "active"
              : ""
          }
        >
          <button
            onClick={() => {
              navigate("/document-listing");
            }}
          >
            Documents
          </button>
        </li>
      </aside>
    </div>
  );
};
