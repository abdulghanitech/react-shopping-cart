import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from './redux/actions/productActions';
import { loadCart, toggleCart, addProduct, removeProduct, addProductQuantity, subProductQuantity } from "./redux/actions/cartActions";
import Product from './components/product';
import CartItem from './components/cartItem';

const App = (props) => {

  const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

  const [currentSelectedSizes, setCurrentSelectedSizes] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    props.dispatch(fetchProducts()).then((Data) => {
      setData(Data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.dispatch(loadCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.dispatch(fetchProducts(currentSelectedSizes)).then((Data) => {
      setData(Data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedSizes]);

  const filter = (e, size) => {
    if (e.target.checked) {
      setCurrentSelectedSizes([...currentSelectedSizes, size]);
    } else {
      if (currentSelectedSizes.length > 0) {
        let newCurrentSelectedSizes = currentSelectedSizes.filter(item => item !== size);
        setCurrentSelectedSizes(newCurrentSelectedSizes);
      }
    }
  };


  return (
    <div className="container" style={{ marginTop: 50 }}>
      <div className="row">
        <div className="col-md-2">
          <p><b>Sizes: </b></p>
          {availableSizes.map(size => (
            <div className="filters-available-size">
              <label>
                <input type="checkbox" value={size} onChange={(e) => filter(e, size)} />
                <span className="checkmark">{size}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="col-md-10">
          <div className="row">
            <p>{data.length > 0 ? data.length + "Product(s) found." : ""}</p>
          </div>
          <div className="row">
            {data.length > 0 && data.map(product => (
              <Product product={product} sku={product.sku} title={product.title} price={product.price} isFreeShipping={product.isFreeShipping} key={product.id} />
            )
            )}
          </div>
        </div>
      </div>

      <div className={!!props.cart.isOpen ? `float-cart float-cart--open` : `float-cart`} onClick={(e) => { e.preventDefault(); props.dispatch(toggleCart()) }}>
        <span className="bag bag--float-cart-closed">
          <span className="bag__quantity">{props.cart && props.cart.addedItems.length > 0 ? props.cart.addedItems.length : 0}</span>
        </span>
        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{props.cart && props.cart.addedItems.length > 0 ? props.cart.addedItems.length : 0}</span>
            </span>
            <span className="header-title">Cart</span>
          </div>
          <div className="float-cart__shelf-container">
            {props.cart && props.cart.addedItems.length > 0 && props.cart.addedItems.map(item => (
              <CartItem product={item} quantity={item.quantity} key={item.id} />
            ))}
          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">$ {props.cart && props.cart.total ? parseFloat(props.cart.total).toFixed(2) : "0"}</p>
            </div>
            <div className="buy-btn">Checkout</div>
          </div>
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = ({ products, cart }) => {
  return { products, cart };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts,
    loadCart,
    addProduct,
    toggleCart,
    addProductQuantity,
    subProductQuantity,
    removeProduct,
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
