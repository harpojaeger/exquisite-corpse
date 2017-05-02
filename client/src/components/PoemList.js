var React = require('react')
var PropTypes = require('prop-types')
var dateFormat = require('dateformat')
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
import '../styles/PoemList.css'
import { Glyphicon } from 'react-bootstrap'

function Timestamp(props) {
  return(
    <span className='timestamp'>
      {dateFormat(new Date(props.children*1),"mmm. d, yyyy")}
    </span>
  )
}

function Poem(props) {
  return (
    <li id={props.id} key={props.id} className='poem'>
      <div className='meta'>

        Poem #{props.id}
        {props.starttime &&
          <span> (<Timestamp>{props.starttime}</Timestamp></span>
        }
        {props.endtime &&
          <span> – <Timestamp>{props.endtime}</Timestamp></span>
        }
        {props.starttime && ')'}
        <a href={'#'+props.id} className='hover-link'>
          <Glyphicon glyph='link' />
        </a>
        <a className='hover-link' href='#top'>
          <Glyphicon glyph='circle-arrow-up' />
        </a>
      </div>
      {props.lines.map( (line, index) =>
        <p className='line' key={index}>{entities.decode(line)}</p>
      )}
    </li>
  )
}
Poem.propTypes = {
  id: PropTypes.number.isRequired,
  starttime: PropTypes.string,
  endtime: PropTypes.string,
  lines: PropTypes.array.isRequired,
}

Poem.defaultProps = {
  starttime: '',
  endtime: '',
}

function PoemList(props) {
  return(
    <ul className='no-bullets no-padding poem-list'>
      {props.poems.map( (poem) =>
        <Poem key={poem.id} id={poem.id} starttime={poem.starttime} endtime={poem.endtime} lines={poem.lines}
        />
      )}
    </ul>
  )
}

PoemList.propTypes = {
  poems: PropTypes.array.isRequired,
}

module.exports = PoemList
