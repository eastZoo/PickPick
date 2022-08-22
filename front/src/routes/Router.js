import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                    <div>
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
                            <Register />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;