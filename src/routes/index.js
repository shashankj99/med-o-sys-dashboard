import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../views/home.view";
import Login from "../views/auth/login.view";
import Register from "../views/auth/register.view";
import {RouteGuardForLogin} from "./guard";
import MobileVerification from "../views/auth/mobile_verification.view";
import EmailVerification from "../views/auth/email_verification.view";
import NotFound from "../views/404.view";
import Profile from "../views/user/profile.view";
import UpdateProfile from "../views/user/update_profile.view";
import RoleList from "../views/roles/list.view";
import Sidebar from "../components/Sidebar";
import menu_items from "../config/menu_items";

const RoutesWithSideBar = ({component: Component, routeRedirect, ...rest}) => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken)
        return (
            <Route 
                {...rest} render={props => (
                    <>
                        <Sidebar items={menu_items()}/>
                        <main className="content">
                            <Component {...props} />
                        </main>
                    </>
                )}
            />
        );
    else
        return (
            <Route 
                {...rest} render={props => (
                    <Redirect to={{ pathname: routeRedirect, state: {from: props.location} }} />
                )}
            />
        );
}

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" render={props => (
                <Redirect to={{pathname: "/home"}} />
            )} />
            <RouteGuardForLogin path="/login" token="access_token" routeRedirect="/home" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/mobile/verify" component={MobileVerification} />
            <Route path="/activate/:token" component={EmailVerification} />
            <RoutesWithSideBar path="/home" token="access_token" routeRedirect="/login" component={Home} />
            <RoutesWithSideBar path="/profile" token="access_token" routeRedirect="/login" component={Profile} />
            <RoutesWithSideBar path="/update/profile" token="access_token" routeRedirect="/login" component={UpdateProfile} />
            <RoutesWithSideBar path="/roles" token="access_token" routeRedirect="/login" component={RoleList} />
            <Route path="*" component={NotFound} />
        </Switch>
    );
}
