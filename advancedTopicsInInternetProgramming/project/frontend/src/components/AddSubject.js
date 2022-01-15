import React, {useState} from "react";
import {auth} from "../../utils/auth";
import axios from "axios";

export const AddSubject = () => {

    const [subjectId, setSubjectId] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [creditHours, setCreditHours] = useState(1);
    const [contactHours, setContactHours] = useState(1);
    const [labs, setLabs] = useState(0);

    const handleAddSubject = async (e) => {
        e.preventDefault();
        e.persist();
        const subjectDetails = {
          subjectId,
          subjectName,
          creditHours,
          contactHours,
          labs
        };

        try{
            const authToken = auth.getAuthToken();
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    Authorization: `Bearer ${authToken}`
                }
            }
            const body = JSON.stringify(subjectDetails);
            const res = await axios.post('/api/subject', body, config);
            console.log(res);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className="addform">
            <form onSubmit={handleAddSubject}>
                <h1 className="addform__heading">Add Subject</h1>
                <input
                    className="addform__input addform__input--full"
                    type="text"
                    placeholder="Subject Code"
                    value={subjectId}
                    onChange={e => setSubjectId(e.target.value)}
                    name="subjectCode"
                />
                <input
                    className="addform__input  addform__input--full"
                    type="text"
                    placeholder="Subject Name"
                    value={subjectName}
                    onChange={e => setSubjectName(e.target.value)}
                    name="subjectName"
                />
                <input
                    className="addform__input addform__input--half addform__input--left"
                    type="number"
                    placeholder="Credit Hours"
                    value={creditHours}
                    onChange={e => setCreditHours(e.target.value)}
                    name="creditHours"
                />
                <input
                    className="addform__input addform__input--half addform__input--right"
                    type="number"
                    placeholder="Contact Hours"
                    value={contactHours}
                    onChange={e => setContactHours(e.target.value)}
                    name="contactHours"
                />
                <input
                    className="addform__input  addform__input--full"
                    type="number"
                    placeholder="labs"
                    value={labs}
                    onChange={e => setLabs(e.target.value)}
                    name="labs"
                />
                <input
                    className="addform__btn"
                    type="submit"
                    name="submit"
                    value="ADD SUBJECT"
                />
            </form>
        </div>
    );
};
