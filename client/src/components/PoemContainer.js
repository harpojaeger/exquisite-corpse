var React = require('react')
const ConnectedPoemList = require('./PoemList')
var Loader = require('./Loader')
var PropTypes = require('prop-types')
import '../styles/PoemContainer.css'
import ConnectedLoadMoreButton from './LoadMoreButton.js'
import { connect } from 'react-redux'

function PoemContainer(props) {
  return (
    <div className='poem-container'>
      <h3>Completed poems</h3>
      <Loader visible={ props.poems.length === 0 }>Loading...</Loader>
      <ConnectedPoemList />
      <ConnectedLoadMoreButton />
    </div>
  )
}
PoemContainer.propTypes = {
  poems: PropTypes.array.isRequired,
}
const mapStateToProps = state => {
  return {
    poems: state.poems
  }
}
const ConnectedPoemContainer = connect(
  mapStateToProps
)(PoemContainer)

module.exports = ConnectedPoemContainer
