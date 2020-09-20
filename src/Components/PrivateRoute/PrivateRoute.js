import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { TravelContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const {state2} = useContext(TravelContext);
    const [loggedInUser, setLoggedInUser] = state2;
    return (
        <Route
        {...rest}
        render={({ location }) =>
            loggedInUser.email ? (
            children
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: location }
                }}
            />
            )
        }
    />
    );
};

export default PrivateRoute;