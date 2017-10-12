import React from 'react'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Poem from './Poem'

function ModalPoem(props){
  let thispoem = props.poems[1]
  console.log('thispoem is',thispoem)
  return(
    <Modal>
      <Poem id={thispoem.id} starttime={thispoem.starttime} endtime={thispoem.endtime} lines={thispoem.lines} />
    </Modal>
  )
}

ModalPoem.propTypes = {
  id: PropTypes.number.isRequired,
  poems: PropTypes.array.isRequired,
}

const mapStateToProps = state => {
  return {
    poems: state.poems,
    id: state.id
  }
}

const ConnectedModalPoem = connect(
  mapStateToProps
)(ModalPoem)

export default ConnectedModalPoem
