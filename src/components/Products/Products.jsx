import React from 'react';

import {Grid} from '@material-ui/core';

import Product from './Product/Product'

import makeStyles from './styles'
// const products = [
//     { id: 1, name: 'Shoes', description: 'Running shoes.', price: '$100.00', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstorage.sg.content-cdn.io%2Fcdn-cgi%2Fimage%2Fwidth%3D780%2Cheight%3D780%2Cquality%3D75%2Cformat%3Dauto%2Fin-resources%2Fb368029c-a4dd-448a-a888-58348cb1b144%2FImages%2FProductImages%2FSource%2FYNTSHTLUMNBL.jpg&f=1&nofb=1' },
//     { id: 2, name: 'Wii', description: 'Da Nintendo Wii', price: '$100.00', image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftiredoldhackdotcom.files.wordpress.com%2F2016%2F02%2Fwii.jpg&f=1&nofb=1' },
// ]


const Products = ({products, onAddToCart}) => {
    const classes = makeStyles()
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify='center' spacing={4} >

                {/* Render all products on grid */}
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product
                            product={product}
                            onAddToCart = {onAddToCart}
                        />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products;