import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {User} from "./User";
import {PrivateRoute} from "./PrivateRoute";
import {Dashboard} from "./Dashboard";
import {Homepage} from "./Homepage";
import {Footer} from "./Footer";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/user" component={User}/>
                <PrivateRoute path="/dashboard">
                    <Dashboard/>
                </PrivateRoute>
                <Route path="/" component={Homepage}/>
                <Footer/>
            </Routes>
        </BrowserRouter>
    );
}
