import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Logo from '../static/images/logo.png';
import { doAuthSuperForgetPassword } from '../common/actions/auth-action';
import { toastr } from 'react-redux-toastr';

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
                    dispatch(doAuthSuperForgetPassword(params)).then((res) => {
                        if (res?.data?.success && res?.status === 200) {
                            toastr.success("Success", res?.data?.message);
                            // navigate("/dashboard");
                            return
                        }
                        else {
                            toastr.error("Error", res?.data?.message);
                            return
                        }
                    });
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
                                <img src={Logo} className="login-logo" alt="Logo" onClick={()=>navigate("/")}/>
                                <h1>Recover Your Password</h1>
                                <div className="form-group">
                                    <input type="text" name="Email" className="form-control"
                                        placeholder="Enter your email address" autoComplete="username"
                                        onChange={ForgotPasswordFormik.handleChange}
                                        value={ForgotPasswordFormik.values.Email}
                                    />
                                    {ForgotPasswordFormik.errors.Email &&
                                        ForgotPasswordFormik.touched.Email && (
                                            <h6 className='validationBx'>{ForgotPasswordFormik.errors.Email}</h6>
                                        )}
                                </div>
                                <div className="form-group">
                                    <button type="submit" className='buttonLog active_button'>Reset Password</button>
                                </div>
                            </form>
                            <div className="foot-bottom">
                                <h6>© 2022 M Society. All Rights Reserved</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}