import React, { useState } from "react";
import { Link } from "react-router-dom";
import main from "../images/LoginMain.png";
import Button from "../components/UI/Button";

const Login = () => {
    const [enteredId, setEnteredId] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [error, setError] = useState("");

    //로그인폼 input text 감지set
    const onChange = (event) => {
        const { target: { name, value },
        } = event;
        if (name == "id") {
            setEnteredId(value);
        } else if (name === "password") {
            setEnteredPassword(value);
        }
    };

    //로그인 폼
    const userLoginHandler = (event) => {
        event.preventDefault();
        // 로그인 조건 추가 위치
        if (enteredId.trim().length === 0 || enteredPassword.trim().length === 0) {
            setError({
                title: '잘못된 입력입니다⛔',
                message: '올바른 아이디 및 비밀번호(빈칸인지) 확인해주세요.'
            })
            return;
        }
        console.log(enteredId, enteredPassword);
        setEnteredId('');
        setEnteredPassword('');
    };

    return (
        <div>
            <img src={main} />
            <form onSubmit={userLoginHandler} >
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
                <Button type="submit">로그인</Button>
            </form>
            <Link to="/signup">
                <Button type="button">회원가입</Button>
            </Link>
        </div>
    );
};

export default Login;