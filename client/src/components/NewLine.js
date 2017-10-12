import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, FormControl } from 'react-bootstrap'
import spinner from '../../static/spinner.gif'
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
import Loader from './Loader'
import { requestPromptRefresh, addNewLine } from '../redux/actions/editing.js'

function ordinal(n) {
  var s=["th","st","nd","rd"],
  v=n%100;
  return n+(s[(v-20)%10]||s[v]||s[0]);
}

class NewLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nextline: ''
    }
    this.handleNextLineChange = this.handleNextLineChange.bind(this)
    this.handleNextLineSubmit = this.handleNextLineSubmit.bind(this)
  }

  handleNextLineChange(event) {
    this.setState({nextline: event.target.value})
  }

  handleNextLineSubmit(e) {
    e.preventDefault()
    if(this.state.nextline) {
      var completed = false
      e.target.value === 'end' && (completed = true)
      this.props.submitNewLine(this.props.id, this.state.nextline, completed)
      this.setState( { nextline: '' })
    }
  }

  render() {
    // Each time a new poem is displayed, choose a random minimum number of lines between 4 and 10.
    let minlines = Math.floor(Math.random() * (10 - 4 + 1)) + 5
    return(
      <div className={this.props.id ? '' : 'hidden'}>
        <div>
          Write the {ordinal(this.props.numlines + 1)} line of this poem:
          <Loader visible={this.props.promptloading}>
            <img src={spinner} alt='loading...' />
          </Loader>
          <div style={{'fontWeight': 'bold'}}>
            {entities.decode(this.props.prompt)}
          </div>
        </div>
        <form>
          <FormControl
            type='text'
            className='editor'
            value={this.state.nextline}
            onChange={this.handleNextLineChange}
          />
          <Button
            type='submit'
            name='action'
            onClick={this.handleNextLineSubmit}
            value='add'
            disabled={this.props.promptloading}>
            Add
          </Button>
          <Button
            type='submit'
            name='action'
            onClick={this.handleNextLineSubmit}
            value='end'
            // Only display the end button if the poem is already at least minlines lines long and there are at least 11 open poems.
            disabled={this.props.promptloading || this.props.numlines < minlines || this.props.uncompletedcount < 10 }>
            End
          </Button>
        </form>
        (<a href='#' onClick={this.props.refreshPrompt}>get a different prompt</a>)
      </div>
    )
  }
}

NewLine.propTypes = {
  id: PropTypes.number.isRequired,
  numlines: PropTypes.number.isRequired,
  promptloading: PropTypes.bool.isRequired,
  prompt: PropTypes.string.isRequired,
  uncompletedcount: PropTypes.number.isRequired,
  refreshPrompt: PropTypes.func.isRequired,
  submitNewLine: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  return {
    id: state.id,
    numlines: state.numlines,
    promptloading: state.promptloading,
    prompt: state.nextline,
    uncompletedcount: state.uncompleted,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshPrompt: () => dispatch(requestPromptRefresh()),
    submitNewLine: (id, line, completed) => dispatch(addNewLine(id, line, completed))
  }
}

const ConnectedNewLine = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewLine)

export default ConnectedNewLine
