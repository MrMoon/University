import React, {useState} from "react";
import {auth} from "../../utils/auth";
import axios from "axios";

export const AddTeacher = () => {

    const [name, setName] = useState('');
    const [id, setID] = useState('');
    const [workingHours, setWorkingHours] = useState('');

    const handleAddTeacher = async (e) => {
        e.preventDefault();
        e.persist();

        const teacherDetails = {
          name,
          id,
          workingHours
        };

        try{
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const body = JSON.stringify(teacherDetails);
            const res = await axios.post('/api/teacher', body, config);
            console.log(res);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className="addform addteacher">
            <form onSubmit={handleAddTeacher}>
                <h1 className="addform__heading">Add Teacher</h1>
                <input
                    className="addform__input addform__input--full"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    name="name"
                />
                <input
                    className="addform__input addform__input--half addform__input--left"
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={e => setID(e.target.value)}
                    name="regNumber"
                />
                <input
                    className="addform__input addform__input--half addform__input--right"
                    type="text"
                    placeholder="Working Hours"
                    value={workingHours}
                    onChange={e => setWorkingHours(e.target.value)}
                    name="workingHours"
                />
                <input
                    className="addform__btn"
                    type="submit"
                    name="submit"
                    value="ADD TEACHER"
                />
            </form>
        </div>
    );
};
