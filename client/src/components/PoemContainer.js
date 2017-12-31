import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ConnectedPoemList from './PoemList'
import Loader from './Loader'
import ConnectedLoadMoreButton from './LoadMoreButton.js'
import CompletedPoemSorter from './CompletedPoemSorter'
import '../sass/PoemContainer.scss'
import { END_DATE, ASC } from '../redux/actions/completedPoems.js'

function PoemContainer(props) {
  // Sort the poems
  var sortedPoems = props.poems
  console.log('sort attr is', props.sort_by, 'and sort order is',props.sort_order)
  sortedPoems.sort( function(a, b){
    // Not all poems have end times, so check that first
    if(a.endtime !== null && b.endtime !== null && props.sort_by === END_DATE) {
      return (parseInt(b.endtime, 10) - parseInt(a.endtime, 10))
    } else {
      // Sort the poems by start date, which is the same as poem ID, since IDs are assigned sequentially upon creation
      return (parseInt(b.id, 10) - parseInt(a.id, 10))
    }

  })
  // Reverse the order if we're sorting ascending
  if(props.sort_order === ASC ) sortedPoems.reverse()
  console.log('sorted poems:', sortedPoems)
  return (
    <div className='poem-container'>
      <h3>Completed poems</h3>
      <Loader visible={ props.poems.length === 0 }>Loading...</Loader>
      <CompletedPoemSorter />
      <ConnectedPoemList poems={sortedPoems.slice(0, props.to)}/>
      <ConnectedLoadMoreButton />
    </div>
  )
}
PoemContainer.propTypes = {
  poems: PropTypes.array.isRequired,
  to: PropTypes.number.isRequired,
  sort_by: PropTypes.string.isRequired,
  sort_order: PropTypes.string.isRequired,
}
const mapStateToProps = state => {
  return {
    poems: state.poems,
    to: state.to,
    sort_by: state.sort_by,
    sort_order: state.sort_order,
  }
}
const ConnectedPoemContainer = connect(
  mapStateToProps
)(PoemContainer)

export default ConnectedPoemContainer
