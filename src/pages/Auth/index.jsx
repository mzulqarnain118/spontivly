import {  Container, Typography } from '@mui/material'
import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/images/Org-placeholder.png'
import { Controls as common } from '../../components/common'
import { loginStyles } from '../../styles'
import { ApiCall, setLocal } from '../../utils'

export function Auth() {
  const navigate = useNavigate()

  const [buttonText, setButtonText] = useState('Login')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    password: '',
    email: ''
  })
  const classes = loginStyles()
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      try {
        setLoading(true)

        if (buttonText === 'Create account') {
          navigate('/onboarding')
        }

        if (buttonText === 'Login') {
          const payload = {
            email: formData.email,
            password: formData?.password
          }
          const response = await ApiCall('auth/login', null, 'POST', payload)

          if (response) {
            const { token, onboarding } = response

            !onboarding && localStorage.clear()
            setLocal('token', token)
            setLocal('onboarding', onboarding)
            navigate(onboarding ? '/channels' : '/onboarding')
          }
        }
      } catch (error) {
        console.error('Error in onSubmit:', error)
      } finally {
        setLoading(false)
      }
    },
    [buttonText, formData, navigate, setButtonText, setLocal]
  )

  return (
    <Container maxWidth="sm" className={classes.container}>
      <common.Img src={logo} type="logo" />
      <common.FormHeading heading=" Welcome to Spontivly Portal" />
      <form onSubmit={onSubmit} className={classes.subContainer} style={{ width: '100%' }}>
        {buttonText === 'Create account' && (
          <common.Input
            name="fullName"
            value={formData.fullName}
            listUpdater={setFormData}
            placeholder="Full name"
            startIcon={true}
            required
          />
        )}
        <common.Input
          name="email"
          placeholder="Email"
          type="email"
          listUpdater={setFormData}
          value={formData.email}
          startIcon="Email"
          required
        />

        {['Create account', 'Login'].includes(buttonText) && (
          <common.Input
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            listUpdater={setFormData}
            startIcon="Password"
            required
          />
        )}
        <common.Link to="#" label="Forgot Password?" style={{ textAlign: 'end' }} />
        <common.MuiButton
          type="submit"
          label={buttonText}
          color="white"
          size="large"
          variant="contained"
          disabled={formData?.email === ''}
        />
      </form>

      <Typography variant="body2" className={classes.bodyText}>
        {buttonText === 'Create account' && (
          <>
            By clicking <common.Link to="#" label="Create account" />
          </>
        )}
        I agree to Spontivly's <common.Link to="https://spontivly.com/terms-of-service" label="Terms of Service" />
        and <common.Link to="https://spontivly.com/privacy-policy" label="Privacy Policy" />
      </Typography>
    </Container>
  )
}
