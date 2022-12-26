import React, { useEffect } from "react";

import { SocietySidebarView } from "./side-bar";
import { SocietyHeaderView } from "./society-header";
import { CountCardView } from "../../common/components/count-card";
import usersImage from "./../../static/images/society-icon.png";
import phoneDirectoryImage from "./../../static/images/directory.png";
import noticeImage from "./../../static/images/notice.png";
import complaintImage from "./../../static/images/complaint-icon.png";
import documentImage from "./../../static/images/documents.png";
import {
  generateNewToken,
  getAllComplaint,
  getAllDocument,
  getAllNotice,
  getAllPhoneDirectory,
  getAllResidentialUser,
} from "../../common/store/actions/society-actions";
import { useDispatch, useSelector } from "react-redux";

export const SocietyDashboardView = () => {
  const dispatch = useDispatch();
  const residentialUserCount = useSelector(
    ({ societyAdmin }) => societyAdmin?.residentialUserList?.count
  );
  const phoneDirectoryCount = useSelector(
    ({ societyAdmin }) => societyAdmin?.phoneDirectoryList?.count
  );
  const noticeCount = useSelector(
    ({ societyAdmin }) => societyAdmin?.noticeList?.count
  );
  const complaintCount = useSelector(
    ({ societyAdmin }) => societyAdmin?.complaintList?.count
  );
  const documentCount = useSelector(
    ({ societyAdmin }) => societyAdmin?.documentList?.count
  );
  useEffect(() => {
    callGetAllResidentialUserAPI(0);
    callGetAllPhoneDirectoryAPI(0);
    callGetAllNoticeAPI(0);
    callGetAllComplaintAPI(0);
    callGetAllDocumentAPI(0);
    // eslint-disable-next-line
  }, []);

  // call Residential user api
  const callGetAllResidentialUserAPI = (pageNo) => {
    dispatch(getAllResidentialUser(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllResidentialUserAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
      }
    });
  };
  // call phone directory api
  const callGetAllPhoneDirectoryAPI = (pageNo) => {
    dispatch(getAllPhoneDirectory(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllPhoneDirectoryAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
      }
    });
  };
  // call notice api
  const callGetAllNoticeAPI = (pageNo) => {
    dispatch(getAllNotice(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllNoticeAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
      }
    });
  };

  // call complaint api
  const callGetAllComplaintAPI = (pageNo) => {
    dispatch(getAllComplaint(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllComplaintAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
      }
    });
  };
  // call document api
  const callGetAllDocumentAPI = (pageNo) => {
    dispatch(getAllDocument(pageNo)).then((res) => {
      if (res?.status === 403 && res?.data?.success === false) {
        dispatch(generateNewToken()).then((res) => {
          if (res?.status === 200 && res?.data?.success) {
            callGetAllDocumentAPI(pageNo);
          }
        });
      } else if (res?.status === 200 && res?.data.success) {
      }
    });
  };
  return (
    <>
      <SocietyHeaderView />
      <div className="wapper">
        <SocietySidebarView />
        {/*  */}
        <div className="main-container">
          <div className="main-heading">
            <h1>Dashboard</h1>
            <div className="ser-part">
              <div className="row">
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <CountCardView
                    title={"Residential Users"}
                    description={"Lorem Ipsum"}
                    image={usersImage}
                    count={residentialUserCount}
                    link={"/residential-user-listing"}
                  />
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <CountCardView
                    title={"Phone Directories"}
                    description={"Lorem Ipsum"}
                    image={phoneDirectoryImage}
                    count={phoneDirectoryCount}
                    link={"/phone-directory-listing"}
                  />
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <CountCardView
                    title={"Notices"}
                    description={"Lorem Ipsum"}
                    image={noticeImage}
                    count={noticeCount}
                    link={"/notice-listing"}
                  />
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <CountCardView
                    title={"Complaints"}
                    description={"Lorem Ipsum"}
                    image={complaintImage}
                    count={complaintCount}
                    link={"/complaint-listing"}
                  />
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6">
                  <CountCardView
                    title={"Documents"}
                    description={"Lorem Ipsum"}
                    image={documentImage}
                    count={documentCount}
                    link={"/document-listing"}
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
