import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../styles/PoemList.css'
import Poem from './CompletedPoem'

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

const mapStateToProps = state => {
  return {
    poems: state.poems.slice(0, state.to)
  }
}

const ConnectedPoemList = connect(
  mapStateToProps
)(PoemList)

module.exports = ConnectedPoemList
