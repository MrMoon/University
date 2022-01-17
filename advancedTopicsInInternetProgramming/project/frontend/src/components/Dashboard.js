import React from "react";
import {BrowserRouter, NavLink, Route} from "react-router-dom";
import {AddClass} from "./AddClass";
import {AddSubject} from "./AddSubject";
import {AddTeacher} from "./AddTeacher";
import {AddSlots} from "./AddSlots";
import {ClassList} from "./ClassList";
import axios from "axios";
import "../styles/dashboard.scss";
import Logo from "../logo.svg";
import {auth} from "../utils/auth";
import {SubjectList} from "./SubjectList";
import {TeacherList} from "./TeacherList";
import {SlotList} from "./SlotList";
import {Timetable} from "./Timetable";
import {OperateManual} from "./OperateManual";

export const Dashboard = () => {

    const handleLogout = async () => {
        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const body = JSON.stringify({});
            const res = await axios.post('/api/user/logout', body, config);
            console.log(res);
            if (res.status === 200) {
                auth.removeAuthToken(authToken);
                window.location.href = '/';
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <BrowserRouter>
            <div className="dashboard row-2-1-5">
                <div className="sidebar">
                    <img className="logo" src={Logo} alt="Logo"/>
                    <ul className="menu">
                        <li className="menu__li menu__li--class">
                            <NavLink
                                className="menu__link menu__link--top"
                                to={`/classes/add`}
                            >
                                Classes
                            </NavLink>
                            <ul className="submenu submenu--class">
                                <li className="submenu__item">
                                    <NavLink
                                        className="submenu__link"
                                        to={`/classes/add`}
                                    >
                                        Add Class
                                    </NavLink>
                                </li>
                                <li className="submenu__item">
                                    <NavLink
                                        className="submenu__link"
                                        to={`/classes/view`}
                                    >
                                        All Classes
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="menu__li menu__li--subject">
                            <NavLink className="menu__link" to={`/subjects/add`}>
                                Subjects
                            </NavLink>
                            <ul className="submenu submenu--subject">
                                <li className="submenu__item">
                                    <NavLink
                                        className="submenu__link"
                                        to={`/subjects/add`}
                                    >
                                        Add Subject
                                    </NavLink>
                                </li>
                                <li className="submenu__item">
                                    <NavLink
                                        className="submenu__link"
                                        to={`/subjects/view`}
                                    >
                                        All Subjects
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="menu__li menu__li--teacher">
                            <NavLink className="menu__link" to={`/teachers/add`}>
                                Teachers
                            </NavLink>
                            <ul className="submenu submenu--teacher">
                                <li className="submenu__item">
                                    <NavLink
                                        className="submenu__link"
                                        to={`/teachers/add`}
                                    >
                                        Add Teacher
                                    </NavLink>
                                </li>
                                <li className="submenu__item">
                                    <NavLink
                                        className="submenu__link"
                                        to={`/teachers/view`}
                                    >
                                        All Teachers
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="menu__li menu__li--slot">
                            <NavLink className="menu__link" to={`/slots/add`}>
                                Slots
                            </NavLink>
                            <ul className="submenu submenu--slot">
                                <li className="submenu__item">
                                    <NavLink
                                        className="submenu__link"
                                        to={`/slots/add`}
                                    >
                                        Add Slot
                                    </NavLink>
                                </li>
                                <li className="submenu__item">
                                    <NavLink
                                        className="submenu__link"
                                        to={`/slots/view`}
                                    >
                                        All Slots
                                    </NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="menu__li">
                            <NavLink to={`/timetable`} className="menu__btn">
                                Generate
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="right-container">
                    <div className="secondary-menubar">
                        <ul className="secondary-menu">
                            <li>
                                <button onClick={handleLogout} className="secondary-menu__btn">Logout</button>
                            </li>
                        </ul>
                    </div>
                    <div className="component-container">
                        <Route path={`/classes/add`} component={AddClass}/>
                        <Route path={`/subjects/add`} component={AddSubject}/>
                        <Route path={`/teachers/add`} component={AddTeacher}/>
                        <Route path={`/slots/add`} component={AddSlots}/>
                        <Route path={`/classes/view`} component={ClassList}/>
                        <Route path={`/subjects/view`} component={SubjectList}/>
                        <Route path={`/teachers/view`} component={TeacherList}/>
                        <Route path={`/slots/view`} component={SlotList}/>
                        <Route path={`/timetable`} component={Timetable}/>
                        <Route path={`/`} component={OperateManual}/>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};
