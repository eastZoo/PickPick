import React, { useState } from "react";
import main from "../images/LoginMain.png";

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //로그인폼 input text 감지set
    const onChange = (event) => {
        const { target: { name, value },
        } = event;
        if (name == "id") {
            setId(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log(id, password);
    };

    return (
        <div>
            <img src={main} />
            <form onSubmit={onSubmit} >
                <input
                    name="id"
                    type="id"
                    placeholder="id"
                    required
                    value={id}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value="로그인"
                />
                {error && <span>{error}</span>}
            </form>
            <span>
                회원가입
            </span>
        </div>
    );
};

export default Login;