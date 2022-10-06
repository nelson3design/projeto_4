import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


function User() {
    
    const [cookies] = useCookies([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.jwt) {
            navigate("/");
        }
    }, [cookies, navigate]);

    const [values, setValues] = useState({ email: "", password: "" });
   
       
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/user",
                {
                    ...values,
                },
                { withCredentials: true }
            );
            if (data) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    
                } else {
                    navigate("/");
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    };
    return (
        <div className="container">
            <h2>Login to your Account</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) =>
                            setValues({ ...values, [e.target.name]: e.target.value })
                        }
                    />
                </div>
                <button type="submit">Submit</button>
                <span>
                    Don't have an account ?<Link to="/register"> Register </Link>
                </span>
            </form>
            
        </div>
    );
}

export default User;