import React from 'react'
import { FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setSortBy, setSortOrder } from '../redux/actions/completedPoems.js'
import '../sass/CompletedPoemSorter.scss'


function CompletedPoemSorter(props){
  return(
    <div className='sort-controls'>
      Sort by
      <FormControl onChange={props.onAttributeChange} componentClass="select" placeholder="completion date">
        <option value="END_DATE">completion date</option>
        <option value="START_DATE">start date</option>
      </FormControl>
      –
      <FormControl onChange={props.onOrderChange} componentClass="select" placeholder="descending">
        <option value="DESC">descending</option>
        <option value="ASC">ascending</option>
      </FormControl>
    </div>

  )
}

CompletedPoemSorter.propTypes = {
  onAttributeChange: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
}


const mapDispatchToProps = dispatch => {
  return{
    onAttributeChange: (e) => dispatch(setSortBy(e.target.value)),
    onOrderChange: (e) => dispatch(setSortOrder(e.target.value))
  }
}

const ConnectedCompletedPoemSorter = connect(
  null,
  mapDispatchToProps
)(CompletedPoemSorter)

export default ConnectedCompletedPoemSorter
