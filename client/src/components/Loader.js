var React = require('react')
var PropTypes = require('prop-types')

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

module.exports = Loader
