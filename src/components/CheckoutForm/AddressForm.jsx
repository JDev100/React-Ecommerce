import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'
import { Link } from 'react-router-dom'
import { commerce } from '../../lib/commerce'

const AddressForm = ({ checkoutToken, test }) => {
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState([''])
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    // const {register, handleSubmit, errors} = useForm()

    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))
    console.log(shippingOptions)

    const countries = Object.entries(shippingCountries).map(([code, name]) => (
        { id: code, label: name }
    ))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => (
        { id: code, label: name }
    ))
    console.log(countries)

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)

        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0]);
        // console.log(countries)
    }

    const fetchSubdivisions = async (checkoutTokenId, countryCode) => {
        const { subdivisions } = await commerce.services.localeListShippingSubdivisions(checkoutTokenId, countryCode)

        setShippingSubdivisions(subdivisions)
        // console.log(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }
    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };


    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)

    }, [])

    useEffect(() => {
        if (shippingCountry)
            fetchSubdivisions(checkoutToken.id, shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSubdivision) {
            fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
            console.log(shippingOptions)
        }


    }, [shippingSubdivision])
  
    const methods = useForm  ();
    const { handleSubmit, reset, control, setValue, watch } = methods;
    const onSubmit = (data) => test({ ...data, shippingCountry, shippingSubdivision, shippingOption })
   
    return (
        <div>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                        <FormInput control={control} name='firstName' label='First name' required />
                        <FormInput control={control} name='lastName' label='Last name' required />
                        <FormInput control={control} name='address' label='Address ' required />
                        <FormInput control={control} name='email' label='Email' required />
                        <FormInput control={control} name='city' label='City' required />
                        <FormInput control={control} name='zip' label='ZIP Code' required />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullwidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id} >
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullwidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id} >
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullwidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id} >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                        <Button type='submit' variant='contained' color='primary'>Next</Button>
                    </div>
                </form>

            </FormProvider>
        </div>
    )
}

export default AddressForm
