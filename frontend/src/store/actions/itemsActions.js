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
    FETCH_ITEM_SUCCESS,
    FETCH_ITEMS_SUCCESS
} from "./actionTypes";

const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

const addDataRequest = () => ({type: ADD_DATA_REQUEST});
const addDataFailure = error => ({type: ADD_DATA_FAILURE, error});
const addDataSuccess = () => ({type: ADD_DATA_SUCCESS});

const deleteDataRequest = () => ({type: DELETE_DATA_REQUEST});
const deleteDataFailure = error => ({type: DELETE_DATA_FAILURE, error});
const deleteDataSuccess = () => ({type: DELETE_DATA_SUCCESS});

const fetchItemsSuccess = items => ({type: FETCH_ITEMS_SUCCESS, items});
const fetchItemSuccess = item => ({type: FETCH_ITEM_SUCCESS, item});

export const fetchItems = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        dispatch(fetchDataRequest());

        try {
            const response = await axios.get('/items', config);
            dispatch(fetchItemsSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};

export const fetchItem = itemId => {
    return async dispatch => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get(`/items/${itemId}`);
            dispatch(fetchItemSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};

export const addItem = itemData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        dispatch(addDataRequest());

        try {
            const response = await axios.post('/items', itemData, config);

            dispatch(addDataSuccess());
            NotificationManager.success(response.data.message);
            dispatch(push('/'))
        } catch (e) {
            dispatch(addDataFailure(e.response.data));
        }
    }
};

export const deleteItem = itemId => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        dispatch(deleteDataRequest());

        try {
            const response = await axios.delete(`/items/${itemId}`, config);

            dispatch(deleteDataSuccess());
            NotificationManager.success(response.data.message);
            dispatch(push('/'));
        } catch (e) {
            NotificationManager.error(e.response.data.message);
            dispatch(deleteDataFailure(e));
        }
    }
};

export const togglePublish = id => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        try {
            await axios.post(`/items/${id}/toggle_publish`, config);
            dispatch(fetchItems());
        } catch (e) {
            console.log(e);
        }
    }
};
