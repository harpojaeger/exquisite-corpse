var React = require('react')
var PropTypes = require('prop-types')
import '../styles/App.css'
import ConnectedPoemContainer from './PoemContainer'
var Editor = require('./Editor')
var api = require('../../utils/api')
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { fetchCompletedPoems } from '../redux/actions/completedPoems.js'
import { refreshPoemCounts } from '../redux/actions/poemCounts.js'
import rootReducer from '../redux/reducers/reducers.js'
import { Provider } from 'react-redux'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

class App extends React.Component {
  constructor(props) {
    super(props)
    store.dispatch(fetchCompletedPoems())
    store.dispatch(refreshPoemCounts())
    this.state = {
      poems: [],
      completedcount: 0,
      uncompletedcount: 0,
    }

    this.refreshPoemCounts = this.refreshPoemCounts.bind(this)
  }

  componentDidMount () {
    this.refreshPoemCounts()
  }

  refreshPoemCounts() {
    api.countCompleted()
    .then( (count) => {
      this.setState({
        completedcount: count
      })
    })

    api.countUncompleted()
    .then( (count) => {
      this.setState({
        uncompletedcount: count
      })
    })
  }

  render() {
    const longEnoughTooltip = (<Tooltip id='long_enough_explanation'>Requiring a minimum poem length has lead to more interesting poems and less trolling.</Tooltip>)
    return (
      <Provider store={store}>
        <div className='app'>
          <h1>Exquisite Corpse</h1>
          <Editor
            refreshCompletedPoems={this.refreshCompletedPoems}
            refreshPoemCounts={this.refreshPoemCounts}
            uncompletedcount={this.state.uncompletedcount}
            completedcount={this.state.completedcount}
          />
          <h4>What is this?</h4>
          <p>Collective, anonymous Internet poetry, written one line at a time.  Anybody can contribute a line, seeing only the one that came before.  Once a poem is long enough,
            <OverlayTrigger
              overlay={longEnoughTooltip}
            placement='top'>
              <sup><Glyphicon glyph='question-sign' /></sup>
            </OverlayTrigger>
          &nbsp;you can also choose to end it, at which point the whole thing becomes public.</p>
          <p>Exquisite Corpse began as a Surrealist parlor game in the early 20th century. I created this Internet version in 2008.  Read about its various incarnations (as it were) <a href="http://harpojaeger.com/2017/05/10/exquisite-corpse" target="_blank">here</a>, and find the tech specs/fine print <a href="https://github.com/harpojaeger/exquisite-corpse/blob/master/README.md">here</a>.</p>
          <p>Made by <a href="http://harpojaeger.com">Harpo Jaeger</a>.</p>
          <ConnectedPoemContainer/>
        </div>
      </Provider>
    )
  }
}

App.propTypes = {
  poems: PropTypes.array,
}

module.exports = App
