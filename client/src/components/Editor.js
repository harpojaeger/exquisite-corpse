import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../styles/Editor.css'
import { refreshPoemCounts } from '../redux/actions/poemCounts.js'
import { requestPromptRefresh } from '../redux/actions/editing.js'
import ConnectedNewLine from './NewLine'
import ConnectedNewPoem from './NewPoem'

class Editor extends Component {
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
  }
  render() {
    return(
      <div className='editor'>
        {this.props.id && <ConnectedNewLine />}
        <ConnectedNewPoem />
        <div>
          Currently there {this.props.uncompleted === 1 ? 'is' : 'are'} {this.props.uncompleted} open poem{this.props.uncompleted !== 1 && 's'} and {this.props.completed} completed poems.
        </div>
      </div>
    )
  }
}

Editor.propTypes = {
  refreshCompletedPoems: PropTypes.func.isRequired,
  refreshPrompt: PropTypes.func.isRequired,
  completed: PropTypes.number.isRequired,
  uncompleted: PropTypes.number.isRequired,
  id: PropTypes.number,
}

const mapStateToProps = state => {
  return {
    completed: state.completed,
    uncompleted: state.uncompleted,
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
