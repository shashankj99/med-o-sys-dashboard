import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import {use_form_fields} from "../../helpers/form.hook";
import {useDispatch, useSelector} from "react-redux";
import {ClearAuthState, login_action} from "../../store/actions/user/auth.action";

let isDisabled = false,
    validationErrors = [];

export default function Login(props) {
    // form hook
    const [fields, handleFieldChange] = use_form_fields({
        username: '',
        password: ''
    });

    const dispatch = useDispatch();

    // dispatch action when page loads... only once
    useEffect(() => {
        dispatch(ClearAuthState());
    }, []);

    // auth response from reducer
    let userAuthResponse = useSelector(state => state.auth.userAuthResponse);

    // function to call on form submit
    const login_user = (e) => {
        isDisabled = true;
        e.preventDefault();

        dispatch(login_action(fields));
    }

    // responses
    if (userAuthResponse.hasOwnProperty('status')) {
        if (userAuthResponse.status === 422) {
            isDisabled = false;
            for (const [key, value] of Object.entries(userAuthResponse.errors)) {
                validationErrors[key] = value;
            }
        } else {
            isDisabled = false;
            dispatch(ClearAuthState());
            if (userAuthResponse.status === 200) {
                localStorage.setItem('access_token', `Bearer ${userAuthResponse.access_token}`);
                localStorage.setItem('roles', JSON.stringify(userAuthResponse.roles));
                props.history.push('/');
            }
            else {
                alert(userAuthResponse.message);
            }
        }
    }

    return (
        <div className="container">
            <div className="lockscreen-wrapper">
                <p className="login-box-msg">Sign in to start your session</p>

                <form onSubmit={login_user} method="post">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className={
                                validationErrors.username
                                    ? `form-control is-invalid`
                                    : `form-control`
                            }
                            placeholder="Email Address or mobile number"
                            id="username"
                            value={fields.username}
                            onChange={handleFieldChange}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-envelope"></span>
                            </div>
                        </div>
                        {
                            validationErrors.username
                                ? <span
                                    className="error invalid-feedback">{validationErrors.username[0]}</span>
                                : ``
                        }
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="password"
                            className={
                                validationErrors.password
                                    ? `form-control is-invalid`
                                    : `form-control`
                            }
                            placeholder="Password"
                            id="password"
                            value={fields.password}
                            onChange={handleFieldChange}
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                            </div>
                        </div>
                        {
                            validationErrors.password
                                ? <span
                                    className="error invalid-feedback">{validationErrors.password[0]}</span>
                                : ``
                        }
                    </div>

                    <div className="row my-2">
                        <div className="col-12">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                disabled={isDisabled}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </form>

                <p className="mb-1">
                    <Link to="/reset/password">I forgot my password</Link>
                </p>
                <p className="mb-1">
                    <Link to="/register" className="text-center">Don't have an account? Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
