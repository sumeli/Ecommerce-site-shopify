import React from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import useStyles from './CartStyles'
import CartItem from './CartItem'
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const isEmpty = !cart?.line_items?.length;
    const classes = useStyles();

    const EmptyCart = () => {
        return (
            <Typography variant="subtitle1">
                Sorry, your Cart is Empty☹️!
                <Link to="/" className={classes.link}>Start adding some products 🛍️</Link>
            </Typography>
        )
    }

    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cart.line_items.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} 
                            handleRemoveFromCart={handleRemoveFromCart} 
                            handleUpdateCartQty={handleUpdateCartQty} />
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cardDetails}>
                    <Typography variant="h4">
                        Subtotal: {cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                        <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
                </div>
            </>
        )
    }

    if (!cart.line_items)
        return "Loading..."

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>
                Your Shopping Cart 🛒
            </Typography>
            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
