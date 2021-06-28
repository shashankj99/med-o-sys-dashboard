import React, {useEffect} from "react";
import {use_form_fields} from "../../helpers/form.hook";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ClearAuthState, verify_otp_action} from "../../store/actions/user/auth.action";

let isDisabled = false,
    validationErrors = [];

export default function MobileVerification(props) {
    const [fields, handleFieldChange] = use_form_fields({
        opt: ''
    });

    const dispatch = useDispatch();

    // dispatch action when page loads... only once
    useEffect(() => {
        dispatch(ClearAuthState());
    }, []);

    // get auth response
    let userAuthResponse = useSelector(state => state.auth.userAuthResponse);

    // function that calls the verification API
    const verify_otp = (e) => {
        isDisabled = true;
        e.preventDefault();

        dispatch(verify_otp_action(fields));
    }

    // errors
    if (userAuthResponse.hasOwnProperty('status')) {
        if (userAuthResponse.status === 422) {
            for (const [key, value] of Object.entries(userAuthResponse.errors)) {
                validationErrors[key] = value;
            }
            isDisabled = false;
        } else {
            isDisabled = false;
            alert(userAuthResponse.message);
            dispatch(ClearAuthState());
            if (userAuthResponse.status === 200)
                props.history.push('/login');
            else
                window.location.reload();
        }
    }

    return (
        <div className="container">
            <div className="lockscreen-wrapper">
                <div className="lockscreen-logo">
                    <Link to="/"><b>Med-O</b>-Sys</Link>
                </div>

                <div className="lockscreen-item">

                    <form className="lockscreen-credentials" onSubmit={verify_otp} method="post">
                        <div className="input-group">
                            <input type="text"
                                   className={
                                       validationErrors.otp
                                           ? `form-control is-invalid`
                                           : `form-control`
                                   }
                                   placeholder="Enter OTP"
                                   required={true}
                                   id="otp"
                                   value={fields.otp}
                                   onChange={handleFieldChange}
                            />

                            {
                                validationErrors.otp
                                    ? <span
                                        className="error invalid-feedback">{validationErrors.otp[0]}</span>
                                    : ``
                            }

                            <div className="input-group-append">
                                <button type="submit" className="btn" disabled={isDisabled}>
                                    <i className="fas fa-arrow-right text-muted"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                </div>

                <div className="help-block text-center">
                    Enter the OTP that was sent to your device to activate your account
                </div>
                <div className="text-center">
                    <Link to="/login">Or sign in if activated</Link>
                </div>
                <div className="lockscreen-footer text-center">
                    Copyright &copy; &nbsp;
                    <b>
                        <Link
                            to="/"
                            className="text-black">
                                Med-O-Sys
                        </Link>
                    </b>
                </div>
            </div>
        </div>
    );
}