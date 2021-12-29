import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material';
import useStyles from './Navbarstyles'
import logo from './logo.png'
import {Link, useLocation} from 'react-router-dom'

const Navbar = ({totalItems}) => {

    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/">
                        <img src={ logo } alt="Commerce.js" height="25px" className={classes.image} />
                        Shopsite
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname == '/' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                            <Badge badgeContent={totalItems} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div> )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
