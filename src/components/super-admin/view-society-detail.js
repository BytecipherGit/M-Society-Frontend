import { useNavigate } from "react-router-dom";
import { SidebarView } from "./side-bar";
import { SuperHeaderView } from "./super-admin-header";
import BackArrow from "../../static/images/back-icon.png";

export const ViewSocietyDetialView = () => {
    const navigate = useNavigate();
    return(
        <>
            <SuperHeaderView />
            <div className="wapper">
                <SidebarView />
                <div className="main-container">
                    <div className="main-heading">
                        <h1>View Society 
                            <button className="active_button effctbtn backbg" onClick={() => {navigate('/society-listing')}}>
                                <img src={BackArrow} alt='Plus' /> Back
                            </button>
                        </h1>
                    </div>

                    <div className="form-box main-form-detial">
                        <form>
                            <h2>Society Detials</h2>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Society Name <span className="ColorRed">*</span></label>
                                        <input type="" name="" class="form-control" value="Shree Ram Society" /> 
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Society Address <span className="ColorRed">*</span></label>
                                        <input type="" name="" class="form-control" value="29 Bengali Square, Indore, Madhya Pradesh 452016" /> 
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Pin <span className="ColorRed">*</span></label>
                                        <input type="" name="" class="form-control" value="451610" /> 
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Registration Number <span className="ColorRed">*</span></label>
                                        <input type="" name="" class="form-control" value="RGBA1245613XXZ" /> 
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <h2>Society Admin Detials</h2>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Admin Name <span className="ColorRed">*</span></label>
                                        <input type="" name="" class="form-control" value="Savan Sharma" /> 
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Admin Address <span className="ColorRed">*</span></label>
                                        <input type="" name="" class="form-control" value="29 Bengali Square, Indore, Madhya Pradesh 452016" /> 
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Phone Number <span className="ColorRed">*</span></label>
                                        <input type="" name="" class="form-control" value="987 654 3210" /> 
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Email <span className="ColorRed">*</span></label>
                                        <input type="" name="" class="form-control" value="savansharma@gmail.com" /> 
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>Occupation (Work) <span className="ColorRed">*</span></label>
                                        <input type="" name="" class="form-control" value="Real Estate Business" /> 
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <label>House Number <span className="ColorRed">*</span></label>
                                        <input type="" name="" class="form-control" value="12" /> 
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <button className="buttonSbmt active_button">Submit</button>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="form-group">
                                        <button className="buttonreset">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>    
            </div>     
        </>
    
)}