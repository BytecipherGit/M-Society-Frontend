import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from '../static/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { superAdminActions } from '../common/actions';
import { toastr } from 'react-redux-toastr';
import { CopyrightView } from './copy-right';
import { CONFIRM_PASS_PLACEHOLDER, NEW_PASS_PLACEHOLDER, OTP_PLACEHOLDER, RESEND_OTP, RESET_YOUR_PASS, SUBMIT } from '../common/constants';


export const ResetPasswordView = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const adminEmail = useSelector(({ superAdmin }) => superAdmin?.otpCred?.email);
    const userEmail = "";
    let Email = adminEmail || userEmail;


    const ResetPasswordFormik = useFormik({
        initialValues: { OTP: "", newPassword: "", confirmPassword: "" },
        validationSchema: Yup.object({
            OTP: Yup.string().required().matches(/^[0-9]+$/).min(4).max(4),
            newPassword: Yup.string().required(),
            confirmPassword: Yup.string().required()
                .oneOf([Yup.ref("newPassword")],),
        }),
        onSubmit: (values) => {
            if (ResetPasswordFormik.dirty && ResetPasswordFormik.isValid) {
                const params = {
                    email: Email,
                    otp: values?.OTP,
                    newPassword: values?.newPassword,
                }
                if (window.location.pathname === "/admin-reset-password") {
                    dispatch(superAdminActions.doAuthSuperSetNewPassword(params)).then((res) => {
                        if (res?.data?.success && res?.status === 200) {
                            toastr.success("Success", res?.data?.message);
                            navigate("/")
                        }
                        else {
                            toastr.error("Error", res?.data?.message);
                            return
                        }
                    })
                }
                else {
                    return

                }
            }
        }
    })
    const ResendOtp = async () => {
        if (window.location.pathname === "/admin-reset-password") {
            dispatch(superAdminActions.doAuthSuperSendOtp({ email: adminEmail })).then((res) => {
                if (res?.data?.success && res?.status === 200) {
                    toastr.success("Success", res?.data?.message);
                    toastr.info("OTP", res?.data?.data?.OTP);
                    return
                }
                else {
                    toastr.error("Error", res?.data?.message);
                    return
                }
            });
        }
        else {
            return
        }

    }
    return (
        <>
            <div className="log-main d-flex">
                <div className="container-fluid">
                    <div className="align-self-cente form-section">
                        <div className="log-box-txt">
                            <form method='POST' onSubmit={ResetPasswordFormik.handleSubmit}>
                                <img src={Logo} className="login-logo" alt="Logo" onClick={() => navigate("/")} />
                                <h1>{RESET_YOUR_PASS}</h1>
                                <div className='form-group'>
                                    <input type='text' className='form-control' name='OTP'
                                        value={ResetPasswordFormik.values.OTP}
                                        onChange={ResetPasswordFormik.handleChange}
                                        placeholder={OTP_PLACEHOLDER}
                                    />

                                    {ResetPasswordFormik.errors.OTP &&
                                        ResetPasswordFormik.touched.OTP && (
                                            <p className='validationBx'>{ResetPasswordFormik.errors.OTP}</p>
                                        )}
                                    <h6 className='resendotpSection d-flex justify-content-end ' onClick={() => { ResendOtp() }}>{RESEND_OTP}</h6>
                                </div>
                                <div className="form-group">
                                    <input type="password" name="newPassword" className="form-control"
                                        placeholder={NEW_PASS_PLACEHOLDER} autoComplete="current-password"
                                        onChange={ResetPasswordFormik.handleChange}
                                        value={ResetPasswordFormik.values.newPassword}
                                    />
                                    {ResetPasswordFormik.errors.newPassword &&
                                        ResetPasswordFormik.touched.newPassword && (
                                            <h6 className='validationBx'>{ResetPasswordFormik.errors.newPassword}</h6>
                                        )}
                                </div>
                                <div className="form-group">
                                    <input type="password" name="confirmPassword" className="form-control"
                                        placeholder={CONFIRM_PASS_PLACEHOLDER} autoComplete="current-password"
                                        onChange={ResetPasswordFormik.handleChange}
                                        value={ResetPasswordFormik.values.confirmPassword}
                                    />
                                    {ResetPasswordFormik.errors.confirmPassword &&
                                        ResetPasswordFormik.touched.confirmPassword && (
                                            <h6 className='validationBx'>{ResetPasswordFormik.errors.confirmPassword}</h6>
                                        )}
                                </div>
                                <div className="form-group">
                                    <button type="submit" className='buttonLog active_button'>{SUBMIT}</button>
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