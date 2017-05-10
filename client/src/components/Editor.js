var React = require('react')
var PropTypes = require('prop-types')
var api = require('../../utils/api')
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
var Loader = require('./Loader')
var spinner = require('../../static/spinner.gif')
require('../styles/Editor.css')
import { Button, FormControl } from 'react-bootstrap'

function ordinal(n) {
    var s=["th","st","nd","rd"],
    v=n%100;
    return n+(s[(v-20)%10]||s[v]||s[0]);
 }

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
    this.handleNextLineChange = this.handleNextLineChange.bind(this)
    this.handleNewPoemChange = this.handleNewPoemChange.bind(this)
    this.refreshPrompt = this.refreshPrompt.bind(this)
    this.handleNextLineSubmit = this.handleNextLineSubmit.bind(this)
    this.handleNewPoemSubmit = this.handleNewPoemSubmit.bind(this)
  }
  componentDidMount() {
    this.refreshPrompt()
  }
  handleNextLineChange(event) {
    this.setState({nextline: event.target.value})
  }

  handleNewPoemChange(event) {
    this.setState({newline: event.target.value})
  }

  refreshPrompt() {
    this.setState({promptloading:true})
    api.random()
    .then(function(poem) {
      this.setState({
        id: poem.id,
        numlines: poem.lines.length,
        prompt: poem.lines[poem.lines.length-1],
        promptloading:false,
        nextline: ''
      })
    }.bind(this))
  }

  handleNextLineSubmit(e) {
    e.preventDefault()
    if(this.state.nextline) {
      console.log(e.target.value,this.state.nextline,this.state.id)
      var completed = false
      // Do the updating actions
      e.target.value === 'end' && (completed = true)
      api.nextline(this.state.id, this.state.nextline, completed)
      .then(function(res) {
        // Store the id of the poem that was just finished
        var finishedPoem = this.state.id
        this.refreshPrompt()
        this.props.refreshPoemCounts()
        if(completed) {
          // Run the refreshCompletedPoems function we received as a prop from <App />
          this.props.refreshCompletedPoems()
          .then( () => {
            document.getElementById(finishedPoem).scrollIntoView()
          })
        }
      }.bind(this))
    }
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
    // Each time a new poem is displayed, choose a random minimum number of lines between 4 and 10.
    var minlines = Math.floor(Math.random() * (10 - 4 + 1)) + 5
    var uncompletedcount = this.props.uncompletedcount
    var completedcount = this.props.completedcount
    return(
      <div className='editor'>
        <div className={this.state.id ? '' : 'hidden'}>
          <div>
            Write the {ordinal(this.state.numlines + 1)} line of this poem:
            <Loader visible={this.state.promptloading}>
              <img src={spinner} alt='loading...' />
            </Loader>
            <div style={{'fontWeight': 'bold'}}>
              {entities.decode(this.state.prompt)}
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
              disabled={this.state.promptloading}>
              Add
            </Button>
            <Button
              type='submit'
              name='action'
              onClick={this.handleNextLineSubmit}
              value='end'
              // Only display the end button if the poem is already at least minlines lines long and there are at least 11 open poems.
              disabled={this.state.promptloading || this.state.numlines < minlines || this.props.uncompletedcount < 10 }>
              End
            </Button>
          </form>
          (<a href='#' onClick={this.refreshPrompt}>get a different prompt</a>)
        </div>
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
  completedcount: PropTypes.number.isRequired,
  uncompletedcount: PropTypes.number.isRequired,
}

module.exports = Editor
