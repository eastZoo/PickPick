import React, { useState } from 'react'
import { Link } from "react-router-dom";
import main from "../images/LoginMain.png";
import Button from "../components/UI/Button";


const Signup = () => {
    const [enteredId, setEnteredId] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [enteredNickname, setEnteredNickname] = useState("");
    const [error, setError] = useState("");

    //로그인폼 input text 감지set
    const onChange = (event) => {
        const { target: { name, value },
        } = event;
        if (name == "id") {
            setEnteredId(value);
        } else if (name === "password") {
            setEnteredPassword(value);
        } else if (name === "nickname") {
            setEnteredNickname(value);
        }
    };

    //회원가입 폼
    const userSignInHandler = (event) => {
        event.preventDefault();
        console.log(enteredId, enteredPassword);
    };

    return (
        <div>
            <img src={main} />
            <form onSubmit={userSignInHandler} >
                <label htmlFor="id">ID</label>
                <input
                    name="id"
                    type="id"
                    placeholder="id"
                    required
                    value={enteredId}
                    onChange={onChange}
                />
                <label htmlFor="password">PASSWORD</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={enteredPassword}
                    onChange={onChange}
                />
                <label htmlFor="nickname">NICK NAME</label>
                <input
                    name="nickname"
                    type="text"
                    placeholder="Nickname"
                    required
                    value={enteredNickname}
                    onChange={onChange}
                />
                <Button type="submit">회원가입</Button>
            </form>
            <Link to="/">
                <Button type="button">돌아가기</Button>
            </Link>
        </div>
    );
}

export default Signup