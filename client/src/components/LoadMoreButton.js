import React from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { displayMorePoems } from '../redux/actions/completedPoems.js'

const LoadMoreButton = (props) => {
  return(
    <Button
      type='submit'
      name='action'
      onClick={props.loadMoreFunc}
      value='add'
      className={ 'load-more ' + (props.hidden && 'hidden') }
    >
      Load {props.num} more poem{ props.num > 1 && 's' }
      {/* {this.state.nextids.first} - {this.state.nextids.last} */}
    </Button>
  )
}

const mapStateToProps = state => {
  return {
    num: state.quantity,
    hidden: state.to >= state.poems.length,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMoreFunc: () => dispatch(displayMorePoems())
  }
}

const ConnectedLoadMoreButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadMoreButton)

export default ConnectedLoadMoreButton
