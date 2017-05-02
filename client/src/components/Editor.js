var React = require('react')
var api = require('../../utils/api')
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()
var Loader = require('./Loader')
var spinner = require('../../static/spinner.gif')
require('../styles/Editor.css')
import { Button, ButtonGroup, FormControl } from 'react-bootstrap'

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
        console.log(res)
        this.refreshPrompt()

        // Run the refreshCompletedPoems function we received as a prop from <App />
        if(completed) this.props.refreshCompletedPoems()
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
      }.bind(this))
    }
  }
  render() {
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
            <ButtonGroup>
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
                // Only display the end button if the poem is already at least 10 lines long
                disabled={this.state.promptloading || this.state.numlines < 10}>
                End
              </Button>
            </ButtonGroup>
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
      </div>
    )
  }
}

module.exports = Editor
