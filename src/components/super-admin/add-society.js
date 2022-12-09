import React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarView } from "./side-bar";
import { SuperHeaderView } from "./super-admin-header";
import BackArrow from "../../static/images/back-icon.png";
import { ADD_SOCIETY, ADMIN_ADDRESS, ADMIN_NAME, BACK_BUTTON, EMAIL, HOUSE_NUMBER, M_SOCIETY_COPYRIGHT, OCCUPATION, PHONE_NUMBER, PIN, REGISTRATION_NUMBER, RESET, SOCIETY_ADDRESS, SOCIETY_ADMIN_DETAILS, SOCIETY_DETAILS, SOCIETY_NAME, SUBMIT } from "../../common/constants";
import { CopyrightView } from "../copy-right";

export const AddSocietyView = () => {
    const navigate = useNavigate();
    return (
        <>
            <SuperHeaderView />
            <div className="wapper">
                <SidebarView />
                <div className="main-container">
                    <div className="main-heading">
                        <h1>{ADD_SOCIETY}
                            <button className="active_button effctbtn backbg" onClick={() => { navigate('/society-listing') }}>
                                <img src={BackArrow} alt='Plus' /> {BACK_BUTTON}
                            </button>
                        </h1>
                    </div>

                    <div className="form-box main-form-detial">
                        <form>
                            <h2>{SOCIETY_DETAILS}</h2>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>{SOCIETY_NAME} <span className="ColorRed">*</span></label>
                                        <input type="" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>{SOCIETY_ADDRESS} <span className="ColorRed">*</span></label>
                                        <input type="" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>{PIN} <span className="ColorRed">*</span></label>
                                        <input type="" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>{REGISTRATION_NUMBER} <span className="ColorRed">*</span></label>
                                        <input type="" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <h2>{SOCIETY_ADMIN_DETAILS}</h2>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>{ADMIN_NAME} <span className="ColorRed">*</span></label>
                                        <input type="" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>{PHONE_NUMBER} <span className="ColorRed">*</span></label>
                                        <input type="" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>{EMAIL} <span className="ColorRed">*</span></label>
                                        <input type="" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>


                            </div>
                            <div className="row">

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>{HOUSE_NUMBER} <span className="ColorRed">*</span></label>
                                        <input type="" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>{OCCUPATION} <span className="ColorRed">*</span></label>
                                        <input type="" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>{ADMIN_ADDRESS}<span className="ColorRed">*</span></label>
                                        <input type="" name="" className="form-control" placeholder="" />
                                    </div>
                                </div>

                            </div>
                            <div className="row">

                                <div className="col-md-2">
                                    <div className="form-group">
                                        <button className="buttonSbmt active_button">{SUBMIT}</button>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <button className="buttonreset">{RESET}</button>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    
                </div>
                
            </div>
        </>

    )
}