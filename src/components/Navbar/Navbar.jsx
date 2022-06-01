import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import{Link, useLocation}  from 'react-router-dom'

import shop_logo from '../../assets/shop_logo.jpg'
import makeStyles from './styles'

const Navbar = ({total_items}) => {
    const classes = makeStyles()
    const location = useLocation();


    return (
        <>
            <AppBar position = 'fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={shop_logo} alt="React Ecommerce" height="25px" className={classes.image}/>
                        React Ecommerce
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                        <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                            <Badge badgeContent={total_items} color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
