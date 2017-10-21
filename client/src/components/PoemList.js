import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../styles/PoemList.css'
import Poem from './Poem'

function PoemList(props) {
  return(
    <ul className='no-bullets no-padding poem-list'>
      {props.poems.map( (poem) =>
        <li key={poem.id} className='poem'>
          <Poem key={poem.id} id={poem.id} starttime={poem.starttime} endtime={poem.endtime} lines={poem.lines}
          />
        </li>
      )}
    </ul>
  )
}

PoemList.propTypes = {
  poems: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
  return {
    displayModal: Boolean(state.id)
  }
}

const ConnectedPoemList = connect(
  mapStateToProps
)(PoemList)

module.exports = ConnectedPoemList
