var React = require('react')
var PropTypes = require('prop-types')
require('../styles/Editor.css')
import { connect } from 'react-redux'
import { refreshPoemCounts } from '../redux/actions/poemCounts.js'
import { requestPromptRefresh } from '../redux/actions/editing.js'
import ConnectedNewLine from './NewLine'
import ConnectedNewPoem from './NewPoem'

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
  }
  // componentDidMount() {
  //   this.refreshPrompt()
  // }
  render() {
    var uncompletedcount = this.props.uncompletedcount
    var completedcount = this.props.completedcount
    return(
      <div className='editor'>
        {this.props.id && <ConnectedNewLine />}
        <ConnectedNewPoem />
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
