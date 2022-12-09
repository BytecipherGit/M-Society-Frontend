import { SidebarView } from "./side-bar";
import { SuperHeaderView } from "./super-admin-header";

export const DashboardView = () => {
    return(
    <>
        <SuperHeaderView />
        <div className="wapper">
            <SidebarView />
        </div>
    </>
)};