import React from "react";
import '../styles/textbox.scss';

export const TextBox = (props) => {
    return (
        <div className="textbox">
            <h2 className="textbox__preheading">{props.preHeading}</h2>
            <h1 className="textbox__heading">{props.heading}</h1>
            <p className="textbox__text">{props.text}</p>
        </div>
    )
};
