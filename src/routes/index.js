import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "../views/home.view";
import Login from "../views/auth/login.view";
import Register from "../views/auth/register.view";
import {RouteGuard, RouteGuardForLogin} from "./guard";
import MobileVerification from "../views/auth/mobile_verification.view";
import EmailVerification from "../views/auth/email_verification.view";
import NotFound from "../views/404.view";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" render={props => (
                <Redirect to={{pathname: "/home"}} />
            )} />
            <RouteGuard path="/home" token="access_token" routeRedirect="/login" component={Home} />
            <RouteGuardForLogin path="/login" token="access_token" routeRedirect="/home" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/mobile/verify" component={MobileVerification} />
            <Route path="/activate/:token" component={EmailVerification} />
            <Route path="*" component={NotFound} />
        </Switch>
    );
}
