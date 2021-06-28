import React from "react";
import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <div className="container">
            <div className="lockscreen-wrapper">
                <div className="lockscreen-item">

                    <section className="content">
                        <div className="error-page">
                            <h2 className="headline text-danger"> 404</h2>

                            <div className="error-content">
                                <h3><i className="fas fa-exclamation-triangle text-warning"></i> Oops! Page not found.
                                </h3>

                                <p>
                                    We could not find the page you were looking for.
                                    Meanwhile, you may <Link to="/">return to dashboard</Link>
                                </p>

                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
