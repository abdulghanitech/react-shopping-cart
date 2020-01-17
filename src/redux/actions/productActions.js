import { FETCH_PRODUCTS } from './actionTypes';
import axios from 'axios';

export const fetchProducts = (filters) => dispatch => {
    return axios
        .get("https://api.jsonbin.io/b/5e2090ac5df640720836846f")
        .then(res => {
            let { products } = res.data;

            if (!!filters && filters.length > 0) {
                products = products.filter(p =>
                    filters.find(f => p.availableSizes.find(size => size === f))
                );
            }

            dispatch({
                type: FETCH_PRODUCTS,
                payload: products
            });
            return products;
        })
        .catch(err => {
            console.log('Could not fetch products. Try again later.');
        });
};