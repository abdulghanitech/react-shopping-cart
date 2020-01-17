import { FETCH_PRODUCTS } from '../actions/actionTypes';

const initialState = {
    products: []
};

const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
        default:
            return state;
    }
}

export default ProductsReducer;