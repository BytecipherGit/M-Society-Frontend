import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import LogoutIcon from "../../static/images/logout-icon.png";
import DropdownIcon from "../../static/images/droup-down-gray.png";
import UserIcon from "../../static/images/user-img.png";
import NotificationsIcon from '../../static/images/notifications-icon.png'


export const SuperHeaderView = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState(false);

    return (
        <>
            <div className="header_dash">
                <div className="">
                    <nav className="navbar navbar-expand-md navbar-dark d-flex justify-content-between">

                        <div className='collapse navbar-collapse' id='navbarCollapse'>
                            <ul className='navbar-nav ml-auto'>
                                <li class="nav-item dropdown" onClick={() => {
                                        setNotification(!notification);
                                    }}>
                                    <button
                                        className={
                                            notification
                                                ? 'nav-link profile-droup nav-link dropdown-toggle dropdown-toggle1'
                                                : 'nav-link profile-droup nav-link dropdown-toggle dropdown-toggle1'
                                        }
                                        id="navbarDropdownMenuLink" 
                                        data-toggle="dropdown" 
                                        aria-expanded="false">
                                        <img src={NotificationsIcon} alt='Notification' />
                                        <span className="notification_point"></span>
                                    </button>
                                    <div
                                        className={
                                            notification ? "dropdown-menu dropdown-notifications dropdownOpen" : "dropdown-menu dropdown-notifications"
                                        }
                                        aria-labelledby="navbarDropdownMenuLink">
                                        <h2>Recent <span>Notifications</span></h2>
                                        <div class="dropdown-noti" id="style-5">
                                            <h4>Today</h4>

                                            <a class="dropdown-item" href="notification.html">
                                                <div class="noti-box-80">
                                                    <h3>juhi Thakur </h3>
                                                    <p>has assigned leave policy Casual Leave to you</p>
                                                </div>
                                                <div class="noti-box-20">
                                                    <p>16:35</p>
                                                </div>
                                            </a>
                                            <a class="dropdown-item" href="notification.html">
                                                <div class="noti-box-80">
                                                    <h3>Pritesh Gore </h3>
                                                    <p>has assigned leave policy Casual Leave to you</p>
                                                </div>
                                                <div class="noti-box-20">
                                                    <p>15:05</p>
                                                </div>
                                            </a>
                                            <a class="dropdown-item" href="notification.html">
                                                <div class="noti-box-80">
                                                    <h3>Prakash Varma </h3>
                                                    <p>has assigned leave policy Casual Leave to you</p>
                                                </div>
                                                <div class="noti-box-20">
                                                    <p>10:35</p>
                                                </div>
                                            </a>

                                            <h4>Yesterday</h4>
                                            <a class="dropdown-item" href="notification.html">
                                                <div class="noti-box-80">
                                                    <h3>Priya Varma </h3>
                                                    <p>has assigned leave policy Casual Leave to you</p>
                                                </div>
                                                <div class="noti-box-20">
                                                    <p>10:35</p>
                                                </div>
                                            </a>

                                            <a class="dropdown-item" href="notification.html">
                                                <div class="noti-box-80">
                                                    <h3>Nidhi Varma </h3>
                                                    <p>has assigned leave policy Casual Leave to you</p>
                                                </div>
                                                <div class="noti-box-20">
                                                    <p>07:02</p>
                                                </div>
                                            </a>

                                            <h4>10-10-2021</h4>
                                            <a class="dropdown-item" href="notification.html">
                                                <div class="noti-box-80">
                                                    <h3>juhi Thakur </h3>
                                                    <p>has assigned leave policy Casual Leave to you</p>
                                                </div>
                                                <div class="noti-box-20">
                                                    <p>16:35</p>
                                                </div>
                                            </a>

                                            <h4>09-10-2021</h4>
                                            <a class="dropdown-item" href="notification.html">
                                                <div class="noti-box-80">
                                                    <h3>Pritesh Gore </h3>
                                                    <p>has assigned leave policy Casual Leave to you</p>
                                                </div>
                                                <div class="noti-box-20">
                                                    <p>15:05</p>
                                                </div>
                                            </a>
                                        </div>
                                        <div class="all-noti-btn"><button>See All Notifications</button></div>
                                    </div>
                                </li>
                                <li
                                    className='nav-item dropdown'
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                >
                                    <button
                                        className={
                                            show
                                                ? 'nav-link profile-droup dropdown-toggle active'
                                                : 'nav-link profile-droup dropdown-toggle'
                                        }
                                        id='navbarDropdownMenuLink'
                                        data-toggle='dropdown'
                                        aria-expanded='false'
                                    >
                                        <img src={UserIcon} className='userIconimg' alt="User" />
                                        <span>Super Admin</span>
                                        <img
                                            src={DropdownIcon}
                                            className='right-doun'
                                            alt="dropdown"
                                        />
                                    </button>
                                    <div
                                        className={
                                            show ? "dropdown-menu dropdownOpen" : "dropdown-menu"
                                        }
                                        aria-labelledby='navbarDropdownMenuLink'
                                    >
                                        <button className='dropdown-item'>
                                            Profile
                                        </button>
                                        <button className='dropdown-item'>
                                            Change Passward
                                        </button>
                                        <hr />
                                        <button
                                            className='dropdown-item dropdown-item-no d-flex'>
                                            Logout
                                            <img src={LogoutIcon} alt='logout icon' />
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};
