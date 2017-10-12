import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../styles/PoemList.css'
import Poem from './Poem'
import ConnectedModalPoem from './ModalPoem'

function PoemList(props) {
  return(
    <ul className='no-bullets no-padding poem-list'>
      {props.displayModal && <ConnectedModalPoem /> }
      {props.poems.map( (poem) =>
        <li id={poem.id} key={poem.id} className='poem'>
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
    poems: state.poems.slice(0, state.to),
    displayModal: Boolean(state.id)
  }
}

const ConnectedPoemList = connect(
  mapStateToProps
)(PoemList)

module.exports = ConnectedPoemList
