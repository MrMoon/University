import React, {useEffect, useState} from "react";
import {auth} from "../utils/auth";
import axios from "axios";
import {TeacherListItem} from "./TeacherListItem";
import "../styles/teacherlist.scss";

export const TeacherList = () => {

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        fetchTeachers().then(data => console.log(data));
    }, []);

    const fetchTeachers = async () => {
        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const res = await axios.get('/api/teacher', config);
            setTeachers(prevState => prevState.concat(res.data));
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveTeacher = async (id) => {
        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const res = await axios.delete(`/api/teacher/${id}`, config);
            console.log(res.status);
        } catch (err) {
            console.log(err);
        }

        setTeachers(prevState => prevState.filter(teacher => teacher._id !== id));
    };

    return (
        <div className="viewbox">
            <h1 className="viewbox__heading">All Teachers</h1>
            {teachers.map((cur) => (
                <TeacherListItem
                    remove={handleRemoveTeacher}
                    regNumber={cur.regNumber}
                    firstName={cur.firstName}
                    lastName={cur.lastName}
                    workingHours={cur.workingHours}
                    subjectName={cur.subjectName}
                    key={cur.regNumber}
                    itemId={cur._id}
                />
            ))}
        </div>
    );

};
