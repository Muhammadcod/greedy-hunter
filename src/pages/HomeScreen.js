import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Profile from '../assets/characterhead.svg'
import Button from '../components/Button'

const HomeScreen = (props) => {}

HomeScreen.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(HomeScreen)
