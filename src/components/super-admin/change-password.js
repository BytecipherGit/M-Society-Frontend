import { SidebarView } from "./side-bar"
import { SuperHeaderView } from "./super-admin-header"

export const ChangePasswordView = () => {
    return(
        <>
            <SuperHeaderView />
            <div className="wapper">
                <SidebarView />
                <div className="main-container">
                    <div className="main-heading">
                        <h1>Edit Society 
                            <button className="active_button effctbtn backbg" onClick={() => {navigate('/society-listing')}}>
                                <img src={BackArrow} alt='Plus' /> Back
                            </button>
                        </h1>
                    </div>
                </div>    

            </div>
        </>
    )
} 