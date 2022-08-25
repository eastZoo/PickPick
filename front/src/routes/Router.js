import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";
import Navigation from "../components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <div
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </div>
                ) : (
                    <>
                        <Route exact path="/">
                            <Login />
                        </Route>
                        <Route exact path="/signup">
                            <Signup />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;