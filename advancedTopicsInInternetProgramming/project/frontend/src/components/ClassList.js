import React, {useEffect, useState} from "react";
import {auth} from "../../utils/auth";
import axios from "axios";
import {ClassListItem} from "./ClassListItem";
import "../styles/classlist.scss";

export const ClassList = () => {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetchClasses().then(value => console.log(value));
    }, [])

    const fetchClasses = async () => {
        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const res = await axios.get('/api/class', config);
            console.log(res.status);
            setClasses((prevState => prevState.concat(res.data)));
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveClass = async (classId) => {
        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const res = await axios.delete(`/api/class/${classId}`, config);
            console.log(res.status);
            setClasses((prevState) => prevState.filter((currentClass) => currentClass._id !== classId));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="viewbox">
            <h1 className="viewbox__heading">All Classes</h1>
            {classes.map((cur) => (
                <ClassListItem
                    remove={handleRemoveClass}
                    classCode={cur.className}
                    session={cur.session}
                    section={cur.section}
                    key={cur.classCode}
                    itemId={cur._id}
                />
            ))}
        </div>
    );
};
