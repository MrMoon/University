import React, {useEffect, useState} from "react";
import {auth} from "../../utils/auth";
import axios from "axios";
import "../styles/subjectlist.scss";
import {SubjectListItem} from "./SubjectListItem";


export const SubjectList = () => {

    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        fetchSubjects().then(data => console.log(data));
    }, []);

    const fetchSubjects = async () => {
        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const res = await axios.get('/api/subjects', config);
            setSubjects(prevState => prevState.concat(res.data));
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveSubject = async (id) => {
        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const res = await axios.delete(`/api/subject/${id}`, config);
            console.log(res.status);
            setSubjects(prevState => prevState.filter(subject => subject._id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="viewbox">
            <h1 className="viewbox__heading">All Subjects</h1>
            {subjects.map((cur) => (
                <SubjectListItem
                    remove={handleRemoveSubject}
                    subjectCode={cur.subjectCode}
                    subjectName={cur.subjectName}
                    creditHours={cur.creditHours}
                    contactHours={cur.contactHours}
                    key={cur.subjectCode}
                    itemId={cur._id}
                />
            ))}
        </div>
    );
};
