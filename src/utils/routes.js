import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AddSocietyView,
  DashboardView,
  EditSocietyView,
  ForgotPasswordView,
  LoginView,
  ResetPasswordView,
  SocietyListingView,
  ViewSocietyDetialView,
  ChangePasswordView,
  AddDesignationView,
  EditDesignationView,
  ViewDesignationDetialView,
  DesignationListingView,
  SocietyDashboardView,
  NoticeListingView,
  AddNoticeView,
  EditNoticeView,
  ViewNoticeDetialView,
  PhoneDirectoryListingView,
  AddPhoneDirectoryView,
  EditPhoneDirectoryView,
  ViewPhoneDirectoryDetialView,
  ComplaintListingView,
  ViewComplaintDetialView,
} from "../components";

import {
  SuperAdminPrivateRoutes,
  OtpPrivateRoutes,
  PrivateRoutes,
  SocietyPrivateRoutes,
} from "./protected-routes";

export const Router = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* < ScrollToTop /> */}
        <Routes>
          {/* <Route path='*' element={<GenericNotFound />} />
					

					<Route element={<DashboardPrivateRoutes />} >
						
					</Route>

					<Route element={<AuthPrivateRoutes />} >
						
					</Route> */}

          <Route element={<PrivateRoutes />}>
            <Route exact={true} path="/" element={<LoginView />} />
            <Route exact={true} path="/society-admin" element={<LoginView />} />
            <Route
              exact={true}
              path="/resident-login"
              element={<LoginView />}
            />
            <Route
              exact={true}
              path="/forgot-password"
              element={<ForgotPasswordView />}
            />
            <Route
              exact={true}
              path="/admin-forgot-password"
              element={<ForgotPasswordView />}
            />
          </Route>

          {/* <Route element={<SuperAdminPrivateRoutes />}>
            <Route exact={true} path="/dashboard" element={<DashboardView />} />
            <Route
              exact={true}
              path="/society-listing"
              element={<SocietyListingView />}
            />
            <Route
              exact={true}
              path="/add-society"
              element={<AddSocietyView />}
            />
            <Route
              exact={true}
              path="/edit-society"
              element={<EditSocietyView />}
            />
            <Route
              exact={true}
              path="/view-society-detail"
              element={<ViewSocietyDetialView />}
            />
            <Route
              exact={true}
              path="/edit-society"
              element={<EditSocietyView />}
            />
            <Route
              exact={true}
              path="/designation-listing"
              element={<DesignationListingView />}
            />
            <Route
              exact={true}
              path="/add-designation"
              element={<AddDesignationView />}
            />
            <Route
              exact={true}
              path="/edit-designation"
              element={<EditDesignationView />}
            />
            <Route
              exact={true}
              path="/view-designation-detail"
              element={<ViewDesignationDetialView />}
            />
            <Route
              exact={true}
              path="/society-admin/dashboard"
              element={<SocietyDashboardView />}
            />
            <Route
              exact={true}
              path="/society-admin/notice"
              element={<SocietyDashboardView />}
            />
            <Route
              exact={true}
              path="/change-password"
              element={<ChangePasswordView />}
            />
          </Route> */}

          <Route element={<SocietyPrivateRoutes />}>
            <Route
              exact={true}
              path="/society-dashboard"
              element={<SocietyDashboardView />}
            />
            <Route
              exact={true}
              path="/notice-listing"
              element={<NoticeListingView />}
            />
            <Route
              exact={true}
              path="/add-notice"
              element={<AddNoticeView />}
            />
            <Route
              exact={true}
              path="/edit-notice"
              element={<EditNoticeView />}
            />
            <Route
              exact={true}
              path="/view-notice-detail"
              element={<ViewNoticeDetialView />}
            />

            <Route
              exact={true}
              path="/phone-directory-listing"
              element={<PhoneDirectoryListingView />}
            />
            <Route
              exact={true}
              path="/add-phone-directory"
              element={<AddPhoneDirectoryView />}
            />
            <Route
              exact={true}
              path="/edit-phone-directory"
              element={<EditPhoneDirectoryView />}
            />
            <Route
              exact={true}
              path="/view-phone-directory-detail"
              element={<ViewPhoneDirectoryDetialView />}
            />
            <Route
              exact={true}
              path="/complaint-listing"
              element={<ComplaintListingView />}
            />
            <Route
              exact={true}
              path="/view-complaint-detail"
              element={<ViewComplaintDetialView />}
            />
          </Route>

          <Route element={<OtpPrivateRoutes />}>
            <Route
              exact={true}
              path="/reset-password"
              element={<ResetPasswordView />}
            />
            <Route
              exact={true}
              path="/admin-reset-password"
              element={<ResetPasswordView />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};
