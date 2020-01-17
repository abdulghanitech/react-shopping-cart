import React from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../redux/actions/cartActions';

const Product = (props) => {
    const { id, sku, title, description, availableSizes, price, isFreeShipping, product, addProduct } = props;
    return (
        <div className="col-md-3">
            <div className="shelf-item" data-sku={sku}>
                <div className="shelf-stopper">{isFreeShipping ? "Free Shipping" : ""}</div>
                <div className="shelf-item__thumb">
                    <img src={require(`../assets/products/${sku}_1.jpg`)} alt="Cat Tee Black T-Shirt" height="300" />
                </div>
                <p className="shelf-item__title">{title}</p>
                <div className="shelf-item__price">
                    <div className="val"><small>$</small><b>{price}</b></div>
                </div>
                <button className="shelf-item__buy-btn" onClick={() => addProduct(product)}>Add to cart</button></div>
        </div>
    );

};


export default connect(null, { addProduct })(Product);