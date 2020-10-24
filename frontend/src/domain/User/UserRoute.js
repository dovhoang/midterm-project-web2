import React from 'react'
import { isAuthenticate } from './apiAuth'
import { Route, Redirect } from 'react-router-dom'

const UserRoute = ({ children, ...rest }) => {
    return (<Route
        {...rest}
        render={(props) => (
            isAuthenticate() ? (
                children
            ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )
        )}

    />);
};

export default UserRoute; 