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
    this.setState({ showModal: false }, () => setTimeout(()=>this.props.history.push(''), 150))
  }
  render(){
    return(
      <Modal show={this.state.showModal} onHide={this.close}>
        <Poem id={this.props.poem.id} starttime={this.props.poem.starttime} endtime={this.props.poem.endtime} lines={this.props.poem.lines} showSelfLink={false}/>
        <Modal.Footer>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ModalPoem.propTypes = {
  poem: PropTypes.object.isRequired
}

const ModalPoemContainer = (props) => {
  console.log('ModalPoemContainer received props', props)
  if(props.poems) {
    var thispoem = props.poems.find( (poem) => poem.id === props.id )
  }
  console.log('thispoem is',thispoem)
  return(
    <div>
      {(typeof thispoem !== 'undefined') &&
        <ModalPoem poem={thispoem} history={props.history}/>}
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
