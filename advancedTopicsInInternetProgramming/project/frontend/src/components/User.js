import React from "react";
import {NavLink, Route, Routes} from "react-router-dom";
import {Login} from "./Login";
import {Register} from "./Register";
import {TextBox} from "./TextBox";
import Clock from '../assets/clock-illustration.png';
import Graduate from '../assets/graduate-illustration.png';
import '../styles/buttonbox.scss';
import '../styles/user.scss';
import {useMatch} from "react-router";

export const User = () => {
    let { path, url } = useMatch();
    return (
        <div className="fp-container">
            <div className="row fw-row col-2-2-1">
                <div className="col-1">
                    <TextBox
                        preHeading="Welcome To"
                        heading="Marshal"
                        text="This app can be used to generate an automatically scheduled time table. Now get rid of all the manual labour of hit and trial method for generating time table"
                    />
                        <Route
                            path={`${path}/signup`}
                            render={()=>
                                <img
                                    src={Clock}
                                    className="form-image"
                                    alt="TimeTable"
                                />}
                        />
                        <Route
                            path={`${path}/login`}
                            render={()=>
                                <img
                                    src={Graduate}
                                    alt="TimeTable"
                                    className="form-image"
                                />}
                        />
                    <div className="buttonbox">
                        <NavLink
                            to={`${url}/signup`}
                            className="buttonbox__button"
                            activeClassName="buttonbox__button--active"
                        >SignUp</NavLink>
                        <NavLink
                            to={`${url}/login`}
                            className="buttonbox__button"
                            activeClassName="buttonbox__button--active"
                        >LogIn</NavLink>
                    </div>
                </div>
                <div className="col-2">
                        <Route path={`${path}/signup`} component={Register} />
                        <Route path={`${path}/login`} component={Login} />
                        <Route path={`${path}/`} exact/>
                </div>
            </div>
        </div>
    );
};
