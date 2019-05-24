import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

// import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Cocktails from "./containers/Cocktails/Cocktails";
import NewCocktail from "./containers/NewCocktail/NewCocktail";
import Cocktail from "./containers/Cocktail/Cocktail";

const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to="/login" />
);

const Routes = ({user}) => {
    return (
        <Switch>

            <ProtectedRoute
                isAllowed={user}
                path="/"
                exact
                component={Cocktails}
            />
            <ProtectedRoute
                isAllowed={user}
                path="/cocktails/new"
                exact
                component={NewCocktail}
            />
            <ProtectedRoute
                isAllowed={user}
                path="/cocktails/:id"
                exact
                component={Cocktail}
            />

            <Route path="/login" component={Login}/>
        </Switch>
    );
};

export default Routes;
