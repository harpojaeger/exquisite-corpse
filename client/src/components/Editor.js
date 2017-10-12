var React = require('react')
var PropTypes = require('prop-types')
var api = require('../../utils/api')
require('../styles/Editor.css')
import { Button, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { refreshPoemCounts } from '../redux/actions/poemCounts.js'
import { requestPromptRefresh } from '../redux/actions/editing.js'
import NewLine from './NewLine'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextline: '',
      newline: '',
      id: null,
      prompt: '',
      numlines: null,
      promptloading: true,
    }

    this.handleNewPoemChange = this.handleNewPoemChange.bind(this)
    this.handleNewPoemSubmit = this.handleNewPoemSubmit.bind(this)
  }
  // componentDidMount() {
  //   this.refreshPrompt()
  // }

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
  render() {
    var uncompletedcount = this.props.uncompletedcount
    var completedcount = this.props.completedcount
    return(
      <div className='editor'>
        {this.props.id && <NewLine />}
        <div>
          <div>
            {this.state.id ? 'or s' : 'S'}tart a new poem:
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
        <div>
          Currently there {uncompletedcount === 1 ? 'is' : 'are'} {uncompletedcount} open poem{uncompletedcount !== 1 && 's'} and {completedcount} completed poems.
        </div>
      </div>
    )
  }
}

Editor.propTypes = {
  refreshCompletedPoems: PropTypes.func.isRequired,
  refreshPrompt: PropTypes.func.isRequired,
  completedcount: PropTypes.number.isRequired,
  uncompletedcount: PropTypes.number.isRequired,
  id: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    completedcount: state.completed,
    uncompletedcount: state.uncompleted,
    id: state.id,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshCompletedPoems: () => dispatch(refreshPoemCounts()),
    refreshPrompt: () => dispatch(requestPromptRefresh()),
  }
}

const ConnectedEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)

module.exports = ConnectedEditor
