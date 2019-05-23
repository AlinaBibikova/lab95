import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST,
    ADD_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_ITEM_SUCCESS,
    FETCH_ITEMS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    items: [],
    item: {},
    loading: true,
    error: null
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, loading: true};

        case FETCH_DATA_FAILURE:
            return {...state, loading: false, error: action.error};

        case FETCH_ITEMS_SUCCESS:
            return {...state, loading: false, items: action.items};

        case FETCH_ITEM_SUCCESS:
            return {...state, loading: false, item: action.item};

        case ADD_DATA_REQUEST:
            return {...state, loading: true};

        case ADD_DATA_FAILURE:
            return {...state, loading: false, error: action.error};

        case ADD_DATA_SUCCESS:
            return {...state, error: null};

        default:
            return state
    }
};

export default itemsReducer;