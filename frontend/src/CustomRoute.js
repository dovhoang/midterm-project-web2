import React, { Component } from "react";
import { Route as RouteReact, Redirect } from "react-router-dom";
import { isAuthenticate } from "./domain/Auth/apiAuth";
import Layout from "./components/Layout";

export const UserRoute = ({ component: Component, ...rest }) => (
    <RouteReact
        {...rest}
        render={props =>
            isAuthenticate() ? (
                <Layout {...props}>
                    <Component {...props} />
                </Layout>
            ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

export const Route = ({ component: Component, ...rest }) => {
    return (
        <RouteReact {...rest} render={props => (
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        )} />
    )
};

