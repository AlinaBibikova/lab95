import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import Cocktails from "./containers/Cocktails/Cocktails";
import NewCocktail from "./containers/NewCocktail/NewCocktail";
import Cocktail from "./containers/Cocktail/Cocktail";
import MyCocktails from "./containers/MyCocktails/MyCocktails";

const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to="/" />
);

const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={Cocktails}/>
            <ProtectedRoute
                isAllowed={user}
                path="/cocktails/new"
                exact
                component={NewCocktail}
            />
            <ProtectedRoute
                isAllowed={user}
                path="/cocktails/mine"
                exact
                component={MyCocktails}
            />
            <Route path="/cocktails/:id" component={Cocktail}/>
        </Switch>
    );
};

export default Routes;
