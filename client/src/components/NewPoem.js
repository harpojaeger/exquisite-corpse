import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
const api = require('../../utils/api')
import { Button, FormControl } from 'react-bootstrap'

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
      api.newpoem(this.state.newline)
      .then(function(res) {
        console.log(res)
        this.setState({
          newline: ''
        })
        this.props.refreshPoemCounts()
      }.bind(this))
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
  id: PropTypes.number
}

const mapStateToProps = state => {
  return {
    id: state.id
  }
}

const ConnectedNewPoem = connect(
  mapStateToProps
)(NewPoem)

export default ConnectedNewPoem
