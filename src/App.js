import React, { useState, useEffect } from 'react'
import Cart from './Cart/Cart';
import { commerce } from './Lib/Commerce';
import Navbar from './Navbar/Navbar'
import Products from './Products'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './CheckoutForm/Checkout';
import Confirm from './CheckoutForm/Confirm';

const App = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve();
        setCart(cart)
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity)
        setCart(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId)
        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty()
        setCart(cart);
    }

    const refreshCart = async() => {
        const {newCart} = await commerce.cart.refresh()
        setCart(newCart)
    }

    const handleCaptureCheckout = async (checkoutTockenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTockenId, newOrder)
            setOrder(incomingOrder)
            refreshCart()

        } catch (error) {
            setErrorMessage(error.data.error.message)
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart)

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Routes>
                    <Route exact path="/" element={<Products products={products} onAddToCart={handleAddToCart} />}>
                    </Route>
                    <Route exact path="/cart" element={<Cart
                        cart={cart}
                        handleUpdateCartQty = {handleUpdateCartQty}
                        handleRemoveFromCart = {handleRemoveFromCart}
                        handleEmptyCart = {handleEmptyCart}
                         />}>
                    </Route>
                    <Route exact path="/checkout" element={<Checkout 
                    cart={cart} 
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                    />}>
                    </Route>
                    <Route exact path="/confirm" element={<Confirm />}/>
                </Routes>
            </div>
        </Router>

    )
}

export default App
