import React, {useState} from "react";
import {Message} from "semantic-ui-react";
import {Link} from "@mui/material";
import {auth} from "../../utils/auth";
import axios from "axios";
import '../styles/form.scss';
import {displayErrors, isFormValid} from "../../utils/FormValidation";

export const Login = () => {

    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const credentials = {
            email,
            password
        }

        if (isFormValid(email, password, undefined, setErrors())) {
            setErrors([])
            try {
                const config = {
                    headers: {
                        'Content-Type': 'Application/json'
                    }
                }
                const body = JSON.stringify(credentials);
                const res = await axios.post('/api/user/login', body, config);
                auth.setAuthToken(res.data.token);
                if (res.data.token)
                    window.location.href = "/dashboard";
            } catch (e) {
                console.log(e);
                let error = {message: "Something went wrong. Try again!"};
                setErrors(prevState => prevState.concat(error));
            }
        }
    };

    return (
        <form className="form" onSubmit={handleFormSubmit}>
            <h3 className="form__heading">Login</h3>
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
                className="form__btn"
                type="submit"
                name="submit"
                value="Login"
            />
            {this.state.errors.length > 0 && (
                <Message className="errorclass">
                    {displayErrors(errors)}
                </Message>
            )}
            <Message style={{marginTop: 30}}>
                Don't have an account? <Link to="/user/signup">Sign Up</Link>
            </Message>
        </form>
    );
};
