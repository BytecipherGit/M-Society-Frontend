import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
  ResidentialUserListingView,
  ViewResidentialUserDetialView,
  ViewDocumentDetialView,
  EditDocumentView,
  AddDocumentView,
  DocumentListingView,
  SocietyAdminChangePasswordView,
  SocietyAdminProfile,
  InvitetionView,
} from "../components";

import {
  OtpPrivateRoutes,
  SocietyPrivateRoutes,
  SuperAdminPrivateRoutes,
} from "./protected-routes";

export const Router = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        {/* < ScrollToTop /> */}
        <Routes>
          <Route>
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

          <Route element={<SocietyPrivateRoutes />}>
            <Route path="*" element={<Navigate to={"/society-dashboard"} />} />
            <Route
              exact={true}
              path="/society-dashboard"
              element={<SocietyDashboardView />}
            />
            <Route
              exact={true}
              path="/notice"
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
              path="/view-notice"
              element={<ViewNoticeDetialView />}
            />
            <Route
              exact={true}
              path="/phone-directory"
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
              path="/view-phone-directory"
              element={<ViewPhoneDirectoryDetialView />}
            />
            <Route
              exact={true}
              path="/complaint"
              element={<ComplaintListingView />}
            />
            <Route
              exact={true}
              path="/view-complaint"
              element={<ViewComplaintDetialView />}
            />
            <Route
              exact={true}
              path="/residential-user"
              element={<ResidentialUserListingView />}
            />
            <Route
              exact={true}
              path="/invitetion"
              element={<InvitetionView />}
            />
            <Route
              exact={true}
              path="/view-residential-user"
              element={<ViewResidentialUserDetialView />}
            />
            <Route
              exact={true}
              path="/document"
              element={<DocumentListingView />}
            />
            <Route
              exact={true}
              path="/add-document"
              element={<AddDocumentView />}
            />
            <Route
              exact={true}
              path="/edit-document"
              element={<EditDocumentView />}
            />
            <Route
              exact={true}
              path="/view-document"
              element={<ViewDocumentDetialView />}
            />

            <Route
              exact={true}
              path="/society-admin-change-password"
              element={<SocietyAdminChangePasswordView />}
            />
            <Route
              exact={true}
              path="/society-admin-profile"
              element={<SocietyAdminProfile />}
            />
          </Route>

          <Route element={<SuperAdminPrivateRoutes />}>
            <Route path="*" element={<Navigate to={"/dashboard"} />} />
            <Route exact={true} path="/dashboard" element={<DashboardView />} />
            <Route
              exact={true}
              path="/society"
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
              path="/view-society"
              element={<ViewSocietyDetialView />}
            />

            <Route
              exact={true}
              path="/designation"
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
              path="/view-designation"
              element={<ViewDesignationDetialView />}
            />

            <Route
              exact={true}
              path="/change-password"
              element={<ChangePasswordView />}
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
