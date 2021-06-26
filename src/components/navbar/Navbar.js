import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" to="#" role="button">
                        <i className="fas fa-bars"> </i>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
