import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DASHBOARD, SOCIETY_LISTING } from "../../common/constants";
import Logo from "../../static/images/dashboard-logo.png";

export const SidebarView = ({ menu }) => {
  const navigate = useNavigate();
  
  return (
    <div className="side">
      <div className="toggle-wrap">
        <span className="toggle-bar">              
        </span>
      </div>
      <aside>
        <div className="aside-logo">
            <img src={Logo} alt="Logo" onClick={() => {navigate('/dashboard')}}/>
        </div>
        <li className={window.location.pathname === "/dashboard" ? "active" : ''}>
          <button onClick={() => {navigate('/dashboard')}}>{DASHBOARD}</button>
        </li>
        <li className={window.location.pathname === "/society-listing" || window.location.pathname === "/add-society" ? "active" : ''}>
          <button onClick={() => {navigate('/society-listing')}}>{SOCIETY_LISTING}</button>
        </li>

      </aside>
    </div>
  );
};
