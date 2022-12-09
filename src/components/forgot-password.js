import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Logo from '../static/images/logo.png';
import { toastr } from 'react-redux-toastr';
import { superAdminActions } from '../common/actions';
import { CopyrightView } from './copy-right';
import {
    EMAIL_PLACEHOLDER,
    RECOVER_YOUR_PASS,
    RESET_PASSWORD
} from '../common/constants';


export const ForgotPasswordView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const ForgotPasswordFormik = useFormik({
        initialValues: { Email: "", Password: "" },
        validationSchema: Yup.object({
            Email: Yup.string().email().required(),
        }),
        onSubmit: (values) => {
            if (ForgotPasswordFormik.dirty && ForgotPasswordFormik.isValid) {
                const params = {
                    email: values?.Email
                }
                if (window.location.pathname === "/admin-forgot-password") {
                    dispatch(superAdminActions.doAuthSuperSendOtp(params)).then((res) => {
                        if (res?.data?.success && res?.status === 200) {
                            toastr.success("Success", res?.data?.message);
                            toastr.info("OTP", res?.data?.data?.OTP)
                            navigate("/admin-reset-password");
                            return
                        }
                        else {
                            toastr.error("Error", res?.data?.message);
                            return
                        }
                    });
                }
                else {
                    // dispatch(superAdminActions.doAuthSuperSendOtp(params)).then((res) => {
                    //     if (res?.data?.success && res?.status === 200) {
                    //         toastr.success("Success", res?.data?.message);
                    //         navigate("/reset-password");
                    //         return
                    //     }
                    //     else {
                    //         toastr.error("Error", res?.data?.message);
                    //         return
                    //     }
                    // });
                }
            }
        }
    })

    return (
        <>
            <div className="log-main d-flex">
                <div className="container-fluid">
                    <div className="align-self-cente form-section">
                        <div className="log-box-txt">
                            <form method='POST' onSubmit={ForgotPasswordFormik.handleSubmit}>
                                <img src={Logo} className="login-logo" alt="Logo" onClick={() => navigate("/")} />
                                <h1>{RECOVER_YOUR_PASS}</h1>

                                <div className="form-group">
                                    <input type="text" name="Email" className="form-control"
                                        placeholder={EMAIL_PLACEHOLDER} autoComplete="username"
                                        onChange={ForgotPasswordFormik.handleChange}
                                        value={ForgotPasswordFormik.values.Email}
                                    />
                                    {ForgotPasswordFormik.errors.Email &&
                                        ForgotPasswordFormik.touched.Email && (
                                            <h6 className='validationBx'>{ForgotPasswordFormik.errors.Email}</h6>
                                        )}
                                </div>

                                <div className="form-group">
                                    <button type="submit" className='buttonLog active_button'>{RESET_PASSWORD}</button>
                                </div>

                            </form>
                            <CopyrightView />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}