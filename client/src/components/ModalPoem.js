import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Poem from './Poem'

function ModalPoem(props){
  let thispoem = props.poems[1]
  console.log('thispoem is',thispoem)
  console.log('ModalPoem received props', props)
  return(
    <Modal show={true}>
      <Poem id={thispoem.id} starttime={thispoem.starttime} endtime={thispoem.endtime} lines={thispoem.lines} />
    </Modal>
  )
}

ModalPoem.propTypes = {
  id: PropTypes.number,
  poems: PropTypes.array.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  return {
    poems: state.poems,
    id: parseInt(ownProps.match.params.id,10),
  }
}

const ConnectedModalPoem = withRouter(connect(
  mapStateToProps
)(ModalPoem))

export default ConnectedModalPoem
