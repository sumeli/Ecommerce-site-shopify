import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput';
import {Link} from 'react-router-dom'
import { commerce } from '../Lib/Commerce';

const AddressForm = ({ checkoutTocken, next}) => {

    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
    const options = shippingOptions.map((shipoptions) => ({
        id: shipoptions.id,
        label: `${shipoptions.description} - (${shipoptions.price.formatted_with_symbol})`
    }))


    const fetchShippingCountries = async (checkoutTockenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTockenId)
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTockenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTockenId, { country, region })

        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutTocken.id)
    }, [])

    useEffect(() => {
        if (shippingCountry)
            fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSubdivision)
            fetchShippingOptions(checkoutTocken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First Name' />
                        <FormInput name='lastName' label='Last Name' />
                        <FormInput name='address' label='Address' />
                        <FormInput name='email' label='Email' />
                        <FormInput name='city' label='City' />
                        <FormInput name='zip' label='Zip Code' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivisions</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to="/cart" variant='outlined'>Back To Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
