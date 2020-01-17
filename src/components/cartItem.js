import React from 'react';
import { connect } from 'react-redux';
import { removeProduct, addProductQuantity, subProductQuantity } from '../redux/actions/cartActions';

const CartItem = (props) => {
    const { product, removeProduct, addProductQuantity, subProductQuantity, quantity } = props;
    return (
        <div className="shelf-item" key={product.id}>
            <div className="shelf-item__del" onClick={() => removeProduct(product)}></div>
            <div className="shelf-item__thumb">
                <img src={require(`../assets/products/${product.sku}_1.jpg`)} width="60" alt="Dark Thug Blue-Navy T-Shirt" />
            </div>
            <div className="shelf-item__details">
                <p className="title">{product.title}</p>
                <p className="desc">{product.description} <br />Quantity: {quantity}</p>
            </div>
            <div className="shelf-item__price"><p>$  {quantity * product.price}</p><div>
                <button className="change-product-button" onClick={(e) => { e.preventDefault(); subProductQuantity(product); }}>-</button>
                <button className="change-product-button" onClick={() => addProductQuantity(product)}>+</button>
            </div>
            </div>
        </div>
    );
};

export default connect(null, { removeProduct, addProductQuantity, subProductQuantity })(CartItem);