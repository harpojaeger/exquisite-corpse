var React = require('react')
var PropTypes = require('prop-types')
import '../styles/PoemNav.css'

function PoemNav(props) {
  return (
    <div>
      <h4>Jump to poem #</h4>
      <ul className='no-bullets no-padding nav'>
        {props.ids.map( (id) =>
          <li className='nav' key={id}><a href={'#'+id}>{id}</a></li>
        )}
      </ul>
    </div>
  )
}

PoemNav.propTypes = {
  ids: PropTypes.array.isRequired,
}

module.exports = PoemNav
