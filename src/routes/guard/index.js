import React from "react";
import { Route, Redirect } from "react-router-dom";

export const RouteGuard = ({ component: Component, token, routeRedirect, ...rest }) => (
    <Route
        {...rest} render={props => (
            localStorage.getItem(token)
                ? <Component {...props} />
                : <Redirect to={{ pathname: routeRedirect, state: {from: props.location} }} />
        )}
    />
);

export const RouteGuardForLogin = ({ component: Component, token, routeRedirect, ...rest }) => (
    <Route
        {...rest} render={props => (
            localStorage.getItem(token)
                ? <Redirect to={{ pathname: routeRedirect, state: {from: props.location} }} />
                : <Component {...props} />
        )}
    />
);
