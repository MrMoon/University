import React, {useState} from "react";
import axios from "axios";
import "../styles/addform.scss";
import {auth} from "../utils/auth";

export const AddClass = () => {

    const [name, setName] = useState('');
    const [session, setSession] = useState(2010);
    const [section, setSection] = useState('');

    const handleAddClass = async (e) => {
        e.preventDefault();
        e.persist();
        const classDetails = {
            name,
            session,
            section
        }

        try {
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            };
            const body = JSON.stringify(classDetails);
            const res = await axios.post("/api/class", body, config);
            console.log(res.data);
            setName('');
            setSection('');
            setSession(2010);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="addform">
            <form onSubmit={handleAddClass}>
                <h1 className="addform__heading">Add CLass</h1>
                <input
                    className="addform__input addform__input--full"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Class Name"
                    name="className"
                />
                <input
                    className="addform__input  addform__input--half addform__input--left"
                    type="text"
                    value={session}
                    onChange={e => setSession(Number.parseInt(e.target.value))}
                    placeholder="Session"
                    name="session"
                />
                <input
                    className="addform__input addform__input--half addform__input--right"
                    type="text"
                    value={section}
                    onChange={e => setSection(e.target.value)}
                    placeholder="Section"
                    name="section"
                />
                <input
                    className="addform__btn"
                    type="submit"
                    name="submit"
                    value="ADD CLASS"
                />
            </form>
        </div>
    );
};
