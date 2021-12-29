import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@mui/material'
import useStyles from './CheckoutStyles'
import {Link} from 'react-router-dom'
import { commerce } from '../Lib/Commerce'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const classes = useStyles();
  const [checkoutTocken, setCheckoutTocken] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
        console.log(token)
        setCheckoutTocken(token)
      }
      catch (error) {

      }
    }
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveState) => prevActiveState + 1)
  const backStep = () => setActiveStep((prevActiveState) => prevActiveState - 1)

  const next = (data) => {
    setShippingData(data)
    nextStep()
  }

  let Confirmation = () => (order.customer ? (
    <>
      <div>
        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      </div>
      <br />
      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
    </>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }

  const Form = () => activeStep === 0
    ? <AddressForm checkoutTocken={checkoutTocken} next={next} /> :
    <PaymentForm
      shippingData={shippingData}
      checkoutTocken={checkoutTocken}
      backStep={backStep}
      nextStep={nextStep}
      onCaptureCheckout={onCaptureCheckout}
    />

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep == steps.length ? <Confirmation /> : checkoutTocken && <Form />}
        </Paper>
      </main>
    </>
  )
}

export default Checkout
