import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CountCardView } from "../../common/components/count-card";
import {
  generateNewToken,
  getAllDesignation,
  getAllSociety,
} from "../../common/store/actions/super-actions";
import { SidebarView } from "./side-bar";
import { SuperHeaderView } from "./super-admin-header";
import societyIcon from "./../../static/images/society-icon.png";
import designationIcon from "./../../static/images/category.png";

export const DashboardView = () => {
  const dispatch = useDispatch();

  const societyCount = useSelector(
    ({ superAdmin }) => superAdmin?.societyList?.count
  );
  const designationCount = useSelector(
    ({ superAdmin }) => superAdmin?.designationList?.count
  );
  useEffect(() => {
    callGetAllSocietyAPI(0);
    callGetAllDesignationAPI(0);
    // eslint-disable-next-line
  }, []);
  // const auth = localStorage.getItem("accessToken");
  // const isSocietyAdmin = localStorage.getItem("isSocietyAdmin");

  const callGetAllSocietyAPI = (pageNo) => {
    dispatch(getAllSociety(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllSocietyAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
      }
    });
  };
  const callGetAllDesignationAPI = (pageNo) => {
    dispatch(getAllDesignation(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllDesignationAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
      }
    });
  };
  return (
    <>
      <SuperHeaderView />
      <div className="wapper">
        <SidebarView />
        {/*  */}
        <div className="main-container">
          <div className="main-heading">
            <h1>Dashboard</h1>
            <div className="ser-part">
              <div className="row">
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <CountCardView
                    title={"Societies"}
                    description={"Lorem Ipsum"}
                    image={societyIcon}
                    count={societyCount}
                    link={"/societies"}
                  />
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <CountCardView
                    title={"Designations"}
                    description={"Lorem Ipsum"}
                    image={designationIcon}
                    count={designationCount}
                    link={"/designations"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
};
