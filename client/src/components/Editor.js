import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import '../sass/Editor.scss'
import { refreshPoemCounts } from '../redux/actions/poemCounts.js'
import { requestPromptRefresh } from '../redux/actions/editing.js'
import ConnectedNewLine from './NewLine'
import ConnectedNewPoem from './NewPoem'

function Editor(props) {
  return(
    <div className='editor'>
      {props.id && <ConnectedNewLine />}
      <ConnectedNewPoem />
      <div>
        Currently there {props.uncompleted === 1 ? 'is' : 'are'} {props.uncompleted} open poem{props.uncompleted !== 1 && 's'} and {props.completed} completed poems.
      </div>
    </div>
  )
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

export default ConnectedEditor
