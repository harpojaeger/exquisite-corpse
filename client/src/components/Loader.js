import React from 'react'
import PropTypes from 'prop-types'

function Loader(props) {
  return (
    <span className={!props.visible && 'hidden'}>
      {props.children}
    </span>
  )
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
}

export default Loader
