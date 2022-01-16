import React, {useState} from "react";
import axios from "axios";
import {auth} from "../../utils/auth";
import "../styles/addform.scss";

export const AddSlots = () => {
    const [teacherName, setTeacherName] = useState('');
    const [session, setSession] = useState(2010);
    const [section, setSection] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [lectures, setLectures] = useState(0);

    const handleAddSlots = async (e) => {
        e.preventDefault();
        e.persist();
        const slotDetails = {
            teacherName,
            subjectName,
            session,
            section,
            lectures
        };

        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const body = JSON.stringify(slotDetails);
            const res = await axios.post('/api/slot ', body, config);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="addform">
            <form onSubmit={handleAddSlots}>
                <h1 className="addform__heading">Add Slots</h1>
                <input
                    className="addform__input addform__input--full"
                    type="text"
                    placeholder="Teacher Name"
                    value={teacherName}
                    onChange={event => setTeacherName(event.target.value)}
                    name="teacherName"
                />
                <input
                    className="addform__input addform__input--full"
                    type="text"
                    placeholder="Subject Name"
                    value={subjectName}
                    onChange={event => setSubjectName(event.target.value)}
                    name="subjectName"
                />
                <input
                    className="addform__input addform__input--full"
                    type="number"
                    placeholder="Session"
                    value={session}
                    onChange={event => setSession(Number.parseInt(event.target.value))}
                    name="session"
                />
                <input
                    className="addform__input addform__input--half addform__input--left"
                    type="text"
                    placeholder="Section"
                    value={section}
                    onChange={event => setSection(event.target.value)}
                    name="section"
                />
                <input
                    className="addform__input addform__input--half addform__input--right"
                    type="number"
                    placeholder="Lectures"
                    value={lectures}
                    onChange={event => setLectures(Number.parseInt(event.target.value))}
                    name="contactHours"
                />
                <input
                    className="addform__btn"
                    type="submit"
                    name="submit"
                    value="ADD SLOTS"
                />
            </form>
        </div>
    );
}
