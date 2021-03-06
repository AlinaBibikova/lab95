import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from 'react-notifications';

import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST,
    ADD_DATA_SUCCESS,
    DELETE_DATA_FAILURE,
    DELETE_DATA_REQUEST,
    DELETE_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_COCKTAIL_SUCCESS,
    FETCH_COCKTAILS_SUCCESS
} from "./actionTypes";

const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

const addDataRequest = () => ({type: ADD_DATA_REQUEST});
const addDataFailure = error => ({type: ADD_DATA_FAILURE, error});
const addDataSuccess = () => ({type: ADD_DATA_SUCCESS});

const deleteDataRequest = () => ({type: DELETE_DATA_REQUEST});
const deleteDataFailure = error => ({type: DELETE_DATA_FAILURE, error});
const deleteDataSuccess = () => ({type: DELETE_DATA_SUCCESS});

const fetchCocktailsSuccess = cocktails => ({type: FETCH_COCKTAILS_SUCCESS, cocktails});
const fetchCocktailSuccess = cocktail => ({type: FETCH_COCKTAIL_SUCCESS, cocktail});

export const fetchCocktails = user => {
    let url = '/cocktails';

    if (user) {
        url += `?user=${user}`
    }

    return async dispatch => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get(url);
            dispatch(fetchCocktailsSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};

export const fetchCocktail = cocktailId => {
    return async dispatch => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get(`/cocktails/${cocktailId}`);
            dispatch(fetchCocktailSuccess(response.data));
        } catch (e) {
            NotificationManager.error(e.response.data.message);
            dispatch(fetchDataFailure(e));
        }
    }
};

export const addCocktail = cocktailData => {
    return async dispatch => {
        dispatch(addDataRequest());

        try {
            const response = await axios.post('/cocktails', cocktailData);

            dispatch(addDataSuccess());
            NotificationManager.success(response.data.message);
            dispatch(push('/'))
        } catch (e) {
            dispatch(addDataFailure(e.response.data));
        }
    }
};

export const deleteCocktail = cocktailId => {
    return async dispatch => {
        dispatch(deleteDataRequest());

        try {
            const response = await axios.delete(`/cocktails/${cocktailId}`);

            dispatch(deleteDataSuccess());
            dispatch(fetchCocktails());
            NotificationManager.success(response.data.message);
            dispatch(push('/'));
        } catch (e) {
            NotificationManager.error(e.response.data.message);
            dispatch(deleteDataFailure(e));
        }
    }
};

export const togglePublish = id => {
    return async dispatch => {

        try {
            await axios.post(`/cocktails/${id}/toggle_publish`);
            dispatch(fetchCocktails());
        } catch (e) {
            console.log(e);
        }
    }
};
