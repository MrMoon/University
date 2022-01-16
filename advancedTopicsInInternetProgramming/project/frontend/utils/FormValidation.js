import React from "react";

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validatePassword = (password) => {
    return String(password)
        .match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);
};

export const isFormValid = (email, password, confirmPassword, setErrors) => {
    let error;

    if (!validateEmail(email)) {
        error = {message: "Please enter a validate email"};
        setErrors(prevState => prevState.concat(error));
        return false;
    }

    if (!validatePassword(password)) {
        error = {message: "Please enter a validate password"};
        setErrors(prevState => prevState.concat(error));
        return false;
    }

    if (confirmPassword !== undefined && (confirmPassword !== password)) {
        error = {message: "Password does not match"};
        setErrors(prevState => prevState.concat(error));
        return false;
    }

    return true;
};

export const displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error.message}</p>);
