import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Modal, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import Poem from './Poem'

class ModalPoem extends Component{
  constructor(props){
    super(props)
    this.state={ showModal: true }
    this.close = this.close.bind(this)
  }
  componentWillReceiveProps(){
    this.setState( { showModal: true} )
  }
  close() {
    this.setState({ showModal: false });
  }
  render(){
    let thispoem = this.props.poems.find( (poem) => poem.id === this.props.id )
    console.log('thispoem is',thispoem)
    console.log('ModalPoem received props', this.props)
    return(
      <Modal show={this.state.showModal} onHide={this.close}>
        <Poem id={thispoem.id} starttime={thispoem.starttime} endtime={thispoem.endtime} lines={thispoem.lines} />
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ModalPoem.propTypes = {
  id: PropTypes.number.isRequired,
  poems: PropTypes.array.isRequired,
}

const ModalPoemContainer = (props) => {
  return(
    <div>
      {props.poems.length>1 &&
        <ModalPoem id={props.id} poems={props.poems}/>}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    poems: state.poems,
    id: parseInt(ownProps.match.params.id,10),
  }
}

const ConnectedModalPoemContainer = withRouter(connect(
  mapStateToProps
)(ModalPoemContainer))

export default ConnectedModalPoemContainer
