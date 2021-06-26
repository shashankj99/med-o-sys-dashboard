import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="container">
            <div className="lockscreen-wrapper">
                <p className="login-box-msg">Sign in to start your session</p>

                <form action="/" method="post">
                    <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="Email" />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-envelope"></span>
                            </div>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <input type="password" className="form-control" placeholder="Password" />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock"></span>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="icheck-primary">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">
                                    Remember Me
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                        </div>
                    </div>
                </form>

                <p className="mb-1">
                    <Link to="#">I forgot my password</Link>
                </p>
                <p className="mb-1">
                    <Link to="/register" className="text-center">Don't have an account? Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
