import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {

    return (
        <nav>
            <ul style={{ display: "flex", justifyContent: "center", marginTop: 50, marginBottom: 40, listStyle: "none", paddingLeft: 0 }}>
                <li>
                    <Link to="/" style={{
                        marginLeft: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 12,
                    }}>
                        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                        <span style={{ marginTop: 10 }}>
                            Main
                        </span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/profile"
                        style={{
                            marginLeft: 33,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                    >
                        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                        <span style={{ marginTop: 10 }}>
                            eastZoo의 프로필
                        </span>
                    </Link>
                </li>
                <li>
                    <Link
                        to="/notice"
                        style={{
                            marginLeft: 33,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                    >
                        <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                        <span style={{ marginTop: 10 }}>
                            사용법
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;