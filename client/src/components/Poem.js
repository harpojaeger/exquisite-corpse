import React from 'react'
import PropTypes from 'prop-types'
import { Glyphicon } from 'react-bootstrap'
import dateFormat from 'dateformat'
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
require('../styles/Poem.css')

function Poem(props) {
  return (
    <div>
      <div className='meta'>
        Poem #{props.id}
        {props.starttime &&
          <span> (<Timestamp>{props.starttime}</Timestamp></span>
        }
        {props.endtime &&
          <span> – <Timestamp>{props.endtime}</Timestamp></span>
        }
        {props.starttime && ')'}
        { props.showSelfLink &&
          <a href={'#'+props.id} className='hover-link'>
            <Glyphicon glyph='link' />
          </a>
        }
      </div>
      {props.lines.map( (line, index) =>
        <p className='line' key={index}>{entities.decode(line)}</p>
      )}
    </div>
  )
}
Poem.propTypes = {
  id: PropTypes.number.isRequired,
  starttime: PropTypes.string,
  endtime: PropTypes.string,
  lines: PropTypes.array.isRequired,
  showSelfLink: PropTypes.bool.isRequired,
}

Poem.defaultProps = {
  starttime: '',
  endtime: '',
  showSelfLink: true,
}

function Timestamp(props) {
  return(
    <span className='timestamp'>
      {dateFormat(new Date(props.children*1),"mmm d, yyyy")}
    </span>
  )
}

export default Poem
