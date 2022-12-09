import { SidebarView } from "./side-bar";
import { SuperHeaderView } from "./super-admin-header";
import ViewIcon from "../../static/images/view.png";
import DeleteIcon from "../../static/images/delete.png";
import EditIcon from "../../static/images/edit-icon.png";
import PlusIcon from "../../static/images/button-plus.png";
import { useNavigate } from "react-router-dom";

export const SocietyListingView = () => {
    const navigate = useNavigate();
    return (
        <>
            <SuperHeaderView />
            <div className="wapper">
                <SidebarView />

                <div className="main-container">
                    <div className="main-heading">
                        <h1>Society <button className="active_button" onClick={() => {navigate('/add-society')}}><img src={PlusIcon} alt='Plus' /> Add</button></h1>
                    </div>
                    <div className="table_design">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>S.No.</th>
                                        <th>Society Name</th>
                                        <th>Address</th>
                                        <th>Admin Name</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>01</td>
                                        <td>Shree Ram Society</td>
                                        <td>29 Bengali Square, Indore, Madhya Pradesh 452016</td>
                                        <td>Savan Sharma</td>
                                        <td>Active</td>
                                        <td>
                                            <button>
                                                <img src={ViewIcon} alt="view icon" onClick={() => {navigate('/view-society-detail')}} />
                                            </button>
                                            <button>
                                                <img src={DeleteIcon} alt="Delete icon" />
                                            </button>
                                            <button>
                                                <img src={EditIcon} alt="view icon" onClick={() => {navigate('/edit-society')}}  />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>02</td>
                                        <td>Shree Krishna Society</td>
                                        <td>29 Bengali Square, Indore, Madhya Pradesh 452016</td>
                                        <td>Raju Patidar</td>
                                        <td>Deactive</td>
                                        <td>
                                            <button>
                                                <img src={ViewIcon} alt="view icon" onClick={() => {navigate('/view-society-detail')}} />
                                            </button>
                                            <button>
                                                <img src={DeleteIcon} alt="Delete icon" />
                                            </button>
                                            <button>
                                                <img src={EditIcon} alt="view icon" onClick={() => {navigate('/edit-society')}}  />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>03</td>
                                        <td>Shree Ram Society</td>
                                        <td>29 Bengali Square, Indore, Madhya Pradesh 452016</td>
                                        <td>Savan Sharma</td>
                                        <td>Active</td>
                                        <td>
                                            <button>
                                                <img src={ViewIcon} alt="view icon" onClick={() => {navigate('/view-society-detail')}} />
                                            </button>
                                            <button>
                                                <img src={DeleteIcon} alt="Delete icon" />
                                            </button>
                                            <button>
                                                <img src={EditIcon} alt="view icon" onClick={() => {navigate('/edit-society')}} />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="paginationBox">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="paginatext">Showing 1 to 10 of 27 entries</p>
                                </div>
                                <div className="col-md-6">
                                    <ul>
                                        <li>Prev</li>
                                        <li className="active">01</li>
                                        <li>02</li>
                                        <li>03</li>
                                        <li>Next</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
};