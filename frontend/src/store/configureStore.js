import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from "connected-react-router";

import {saveToLocalStorage, loadFromLocalStorage} from "./localStorage";
import usersReducer from '../store/reducers/usersReducer';
import itemsReducer from '../store/reducers/itemsReducer';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    items: itemsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedSate = loadFromLocalStorage();

const store = createStore(rootReducer, persistedSate, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user,
        }
    });
});

export default store;

