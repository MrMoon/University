import React, {useState} from "react";
import {Message} from "semantic-ui-react";
import {Link} from "@mui/material";
import axios from "axios";
import {auth} from "../utils/auth";
import {displayErrors, isFormValid} from "../utils/FormValidation";
import '../styles/form.scss';


export const Register = () => {
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid(email, password, confirmedPassword, setErrors)) {
            this.setState({
                errors: []
            });
            const newUser = {
                name,
                email,
                password
            }
            try {
                const config = {
                    headers: {
                        'Content-Type': 'Application/json'
                    }
                }
                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/user/signup', body, config);
                auth.setAuthToken(res.data.token);
                window.location.href = "/user/login";
            } catch (e) {
                console.log(e);
                let error = {message: "Something went wrong. Try again!"};
                setErrors(prevState => prevState.concat(error));
            }
        }
    };

    return (
        <form className="form" onSubmit={handleFormSubmit}>
            <h3 className="form__heading">SIGNUP</h3>
            <input
                className="form__input"
                placeholder="Name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                name="firstname"
            />
            <input
                className="form__input"
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
            />
            <input
                className="form__input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                name="password"
            />
            <input
                className="form__input"
                placeholder="Confirm Password"
                type="password"
                value={confirmedPassword}
                onChange={e => setConfirmedPassword(e.target.value)}
                name="confirm"
            />
            <input
                className="form__btn"
                type="submit"
                name="submit"
                value="Sign Up"
            />
            {this.state.errors.length > 0 && (
                <Message className="errorclass">
                    {displayErrors(errors)}
                </Message>
            )}
            <Message style={{marginTop: 30}}>
                Already a user? <Link to="/user/login">Login</Link>
            </Message>
        </form>

    )
};
