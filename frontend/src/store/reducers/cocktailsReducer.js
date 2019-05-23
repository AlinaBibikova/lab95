import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST,
    ADD_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_COCKTAIL_SUCCESS,
    FETCH_COCKTAILS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    cocktails: [],
    cocktail: {},
    loading: true,
    error: null
};

const cocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, loading: true};

        case FETCH_DATA_FAILURE:
            return {...state, loading: false, error: action.error};

        case FETCH_COCKTAILS_SUCCESS:
            return {...state, loading: false, cocktails: action.cocktails};

        case FETCH_COCKTAIL_SUCCESS:
            return {...state, loading: false, cocktail: action.cocktail};

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

export default cocktailsReducer;