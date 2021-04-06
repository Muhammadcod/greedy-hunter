import React from 'react'
import PropTypes from 'prop-types'

const Layout = ({ children }) => (
  <div className="container " style={{ height: `100%` }}>
    <div className="row layout">
      <div className="svg  col-sm" />
      <div className="col-sm-5 main" style={{ height: `85%` }}>
        {children}
      </div>
      <div className=" svg col-sm" />
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.element,
}

export default Layout
