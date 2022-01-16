import React from "react";
import {auth} from "../../utils/auth";
import {Route} from "react-router-dom";

export const PrivateRoute = ({children, ...others}) => {

    const handleRedirectLogin = () => window.location.href = "/login";

    const handleRedirectSignup = () => window.location.href = "/signup";

    return (
        <Route
            {...others}
            render={() =>
                auth.isAuthenticated() ? (
                    children
                ) : (
                    <div>
                        <p className="text">User not authenticated. Please sign up or login for accessing this page</p>
                        <button onClick={handleRedirectLogin}>Login</button>
                        <button onClick={handleRedirectSignup}>SignUp</button>
                    </div>
                )
            }
        />
    );
};
