import React from "react";
import { useNavigate } from "react-router";
import { SidebarView } from "./side-bar";
import { SuperHeaderView } from "./super-admin-header";
import RightTick from "../../static/images/right-tick.png";

export const ChangePasswordView = () => {
    const navigate = useNavigate();
    return (
        <>
            <SuperHeaderView />
            <div className="wapper">
                <SidebarView />
                <div className="main-container">
                    {/* <div className="main-heading">
                        <h1>Change Password
                            <button className="active_button effctbtn backbg" onClick={() => { navigate('/dashboard') }}>
                                <img src={BackArrow} alt='Plus' /> Back
                            </button>
                        </h1>
                    </div> */}

                    <div className='row'>
                        <div className='col-xl-7 col-lg-8 col-md-12 m-auto'>
                            <div className='changePasswordUI'>
                                <div className="row">
                                    <div className="col-lg-5 col-md-12">
                                        <h2>Change Password</h2>
                                        <p>Password must contain:</p>
                                        <ul>
                                            <li><img src={RightTick} alt='Right Tick'/> At least 6 characters long</li>
                                            <li><img src={RightTick} alt='Right Tick'/> At least 1 upper case letter (A to Z)</li>
                                            <li><img src={RightTick} alt='Right Tick'/> At least 1 lower case letter (a to z)</li>
                                            <li><img src={RightTick} alt='Right Tick'/> At least 1 number (0 to 9)</li>
                                        </ul>
                                    </div>
                                    <div className="col-lg-7 col-md-12">
                                        <form method='POST'>
                                            <div className='form-group'>
                                                <input type='text' placeholder='Old Password' name='oldPassword' className='form-control' />
                                            </div>
                                            <div className='form-group'>
                                                <input type='text' placeholder='New Password' name='newPassword' className='form-control' />
                                            </div>
                                            <div className='form-group'>
                                                <input type='text' placeholder='Confirm Password' name='confirmPassword' className='form-control' />
                                            </div>
                                            <div className='form-group'>
                                                <button type='button' className='active_button col-ml-6'>Change Password</button>                                                   
                                                <button type='button' className="ColorRed col-ml-6 cancelBnt" onClick={()=>navigate("/dashboard")}>Cancel</button> 
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
} 