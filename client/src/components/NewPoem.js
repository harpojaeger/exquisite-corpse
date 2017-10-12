import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, FormControl } from 'react-bootstrap'
import { createNewPoem } from '../redux/actions/editing.js'

class NewPoem extends Component {
  constructor(props){
    super(props)
    this.state = {
      newline: ''
    }
    this.handleNewPoemChange = this.handleNewPoemChange.bind(this)
    this.handleNewPoemSubmit = this.handleNewPoemSubmit.bind(this)
  }

  handleNewPoemChange(event) {
    this.setState({newline: event.target.value})
  }

  handleNewPoemSubmit(e) {
    e.preventDefault()
    if(this.state.newline) {
      var action = e.target
      console.log(action)
      this.props.createNewPoem(this.state.newline)
      this.setState({
        newline: ''
      })
    }
  }

  render(){
    return (
      <div>
        <div>
          {this.props.id ? 'or s' : 'S'}tart a new poem:
        </div>
        <form action='#' onSubmit={this.handleNewPoemSubmit}>
          <FormControl
            type='text'
            className='editor'
            value={this.state.newline}
            onChange={this.handleNewPoemChange}
          />
          <Button
            type='submit'
            name='action'
          value='start'>
            Start
          </Button>
        </form>
      </div>
    )
  }
}

NewPoem.propTypes = {
  id: PropTypes.number,
  createNewPoem: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    id: state.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createNewPoem: (line) => dispatch(createNewPoem(line))
  }
}

const ConnectedNewPoem = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPoem)

export default ConnectedNewPoem
