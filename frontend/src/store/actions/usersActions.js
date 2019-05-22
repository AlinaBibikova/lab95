import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from "react-notifications";

export const LOGOUT_USER = 'LOGOUT_USER';

export const logoutUserSuccess = () => {
    return {type: LOGOUT_USER}
};

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUser = () => {
    return (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {header: {'Authorization': token}};

        return axios.delete('/users/sessions', config).then(
            () => {
                dispatch(logoutUserSuccess());
                NotificationManager.success('Logged out!')
            },
            error => {
                NotificationManager.error('Could not logout!')
            }
        )
    }
};

export const LoginUser = userData => {
    return dispatch => {
        return axios.post('/users/sessions', userData)
            .then(
                response => {
                    dispatch(loginUserSuccess(response.data.user));
                    dispatch(push('/'))
                },
                error => {
                    if (error.response && error.response.data) {
                        dispatch(loginUserFailure(error.response.data))
                    } else {
                        dispatch(loginUserFailure({global: 'No connection!'}));
                    }
                }
            )
    }
};

export const facebookLogin = userData => {
    return dispatch => {
        return axios.post('/users/facebookLogin', userData).then(
            response => {
                dispatch(loginUserSuccess(response.data.user));
                NotificationManager.success('Logged in via Facebook');
                dispatch(push('/'));
            },
            () => {
                dispatch(loginUserFailure('Login via Facebook failed'));
            }
        )
    }
};