import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from "react-notifications";
import {LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS} from "./actionTypes";
import {fetchCocktails} from "./cocktailsActions";

const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        try {
            const response = await axios.delete('/users/sessions', config);
            dispatch(logoutUserSuccess());
            dispatch(fetchCocktails());
            NotificationManager.success(response.data.message);
            dispatch(push('/'));
        } catch {
            NotificationManager.error('Could not logout!');
        }
    }
};

export const facebookLogin = userData => {
    return async dispatch => {
        try {
            const response = await axios.post('/users/facebookLogin', userData);
            dispatch(loginUserSuccess(response.data.user));
            dispatch(fetchCocktails());
            NotificationManager.success('Logged in via Facebook');
            dispatch(push('/'));
        } catch {
            dispatch(loginUserFailure('Login via Facebook failed'));
        }
    }
};
