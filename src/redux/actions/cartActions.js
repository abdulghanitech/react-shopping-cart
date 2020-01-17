import { LOAD_CART, ADD_PRODUCT, REMOVE_PRODUCT, CHANGE_PRODUCT_QUANTITY, ADD_QUANTITY, SUB_QUANTITY, TOGGLE_CART } from './actionTypes';
import axios from 'axios';

export const loadCart = () => dispatch => {
    return axios
        .get("https://api.jsonbin.io/b/5e2090ac5df640720836846f")
        .then(res => {
            let { products } = res.data;
            dispatch({
                type: LOAD_CART,
                payload: products
            });
            return products;
        })
        .catch(err => {
            console.log('Could not fetch products. Try again later.');
        });
};

export const addProduct = id => ({
    type: ADD_PRODUCT,
    payload: id
});

export const removeProduct = id => ({
    type: REMOVE_PRODUCT,
    payload: id
});

export const changeProductQuantity = id => ({
    type: CHANGE_PRODUCT_QUANTITY,
    payload: id
});

export const addProductQuantity = id => ({
    type: ADD_QUANTITY,
    payload: id
});

export const subProductQuantity = id => ({
    type: SUB_QUANTITY,
    payload: id
});

export const toggleCart = id => ({
    type: TOGGLE_CART,
    payload: id
});