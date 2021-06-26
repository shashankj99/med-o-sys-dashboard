import React from "react";
import {use_form_fields} from "../../helpers/form.hook";
import {Link} from "react-router-dom";

let isDisabled = false;

export default function MobileVerification() {
    const [fields, handleFieldChange] = use_form_fields({
        opt: ''
    });

    const verify_otp = (e) => {
        isDisabled = true;
        e.preventDefault();

        console.log(fields);
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
                                   className="form-control"
                                   placeholder="Enter OTP"
                                   required={true}
                                   id="otp"
                                   onChange={handleFieldChange}
                            />

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