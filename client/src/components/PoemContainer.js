import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ConnectedPoemList from './PoemList'
import Loader from './Loader'
import ConnectedLoadMoreButton from './LoadMoreButton.js'
import '../styles/PoemContainer.css'

function PoemContainer(props) {
  return (
    <div className='poem-container'>
      <h3>Completed poems</h3>
      <Loader visible={ props.poems.length === 0 }>Loading...</Loader>
      <ConnectedPoemList poems={props.poems.slice(0, props.to)}/>
      <ConnectedLoadMoreButton />
    </div>
  )
}
PoemContainer.propTypes = {
  poems: PropTypes.array.isRequired,
  to: PropTypes.number.isRequired,
}
const mapStateToProps = state => {
  return {
    poems: state.poems,
    to: state.to
  }
}
const ConnectedPoemContainer = connect(
  mapStateToProps
)(PoemContainer)

module.exports = ConnectedPoemContainer
