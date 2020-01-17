import React, { useEffect, Suspense, useState } from 'react';
import Filter from './components/filters';
import { connect } from 'react-redux';
import { fetchProducts } from './redux/actions/productActions';
import { loadCart, addProduct, removeProduct, addProductQuantity, subProductQuantity } from "./redux/actions/cartActions";
import Product from './components/product';

const App = (props) => {

  const availableSizes = ['XS', 'S', 'M', 'ML', 'L', 'XL', 'XXL'];

  const [currentSelectedSizes, setCurrentSelectedSizes] = useState([]);

  const [data, setData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    props.dispatch(fetchProducts()).then((Data) => {
      //console.log(Data);
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
      //console.log(Data);
      setData(Data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedSizes]);

  const filter = (e, size) => {
    console.log("changed");
    console.log(size);
    console.log(e.target.checked);
    if (e.target.checked) {
      setCurrentSelectedSizes([...currentSelectedSizes, size]);

    } else {
      //setCurrentSelectedSizes([...currentSelectedSizes, size]);
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

      <div className={isOpen ? `float-cart float-cart--open` : `float-cart`} onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen) }}>
        <span className="bag bag--float-cart-closed"><span className="bag__quantity">{props.cart && props.cart.addedItems.length > 0 ? props.cart.addedItems.length : 0}</span></span>

        <div className="float-cart__content">
          <div className="float-cart__header">
            <span className="bag">
              <span className="bag__quantity">{props.cart && props.cart.addedItems.length > 0 ? props.cart.addedItems.length : 0}</span>
            </span>
            <span className="header-title">Cart</span>
          </div>
          <div className="float-cart__shelf-container">
            {props.cart && props.cart.addedItems.length > 0 && props.cart.addedItems.map(item => (
              <div className="shelf-item" key={item.id}>
                <div className="shelf-item__del" onClick={() => props.dispatch(removeProduct(item))}></div>
                <div className="shelf-item__thumb">
                  <img src={require(`./assets/products/${item.sku}_1.jpg`)} width="60" alt="Dark Thug Blue-Navy T-Shirt" />
                </div>
                <div className="shelf-item__details">
                  <p className="title">{item.title}</p>
                  <p className="desc">{item.description} <br />Quantity: {item.quantity}</p>
                </div>
                <div className="shelf-item__price"><p>$  {item.quantity * item.price}</p><div>
                  <button className="change-product-button" onClick={(e) => { e.preventDefault(); props.dispatch(subProductQuantity(item)); }}>-</button>
                  <button className="change-product-button" onClick={() => props.dispatch(addProductQuantity(item))}>+</button>
                </div>
                </div>
              </div>
            ))}


          </div>

          <div className="float-cart__footer">
            <div className="sub">SUBTOTAL</div>
            <div className="sub-price">
              <p className="sub-price__val">$ {props.cart && props.cart.total ? parseFloat(props.cart.total).toFixed(2) : ""}</p>

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
    addProductQuantity,
    subProductQuantity,
    removeProduct,
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
