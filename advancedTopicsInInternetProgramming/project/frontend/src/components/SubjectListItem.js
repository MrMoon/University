import React from "react";
import "../styles/subjectlistitem.scss";

export const SubjectListItem = (props) => {
    const handleRemoveSubject = () => {
        props.remove(props.itemId);
    };

    return (
        <div className="subject">
            <p className="subject__details">
                {props.subjectCode}-{props.subjectName} | Credit Hours:{" "}
                {props.creditHours} | Contact Hours: {props.contactHours}
            </p>
            <button
                onClick={handleRemoveSubject}
                className="subject__btn subject__btn--remove"
            >
                Remove
            </button>
        </div>
    );
};
