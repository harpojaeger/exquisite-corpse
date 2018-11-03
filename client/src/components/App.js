import React, { Component } from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import '../styles/App.css'
import ConnectedPoemContainer from './PoemContainer'
import ConnectedEditor from './Editor'
import ConnectedModalPoem from './ModalPoem'
import { fetchCompletedPoems } from '../redux/actions/completedPoems.js'
import { refreshPoemCounts } from '../redux/actions/poemCounts.js'
import { requestPromptRefresh } from '../redux/actions/editing.js'
import rootReducer from '../redux/reducers/reducers.js'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

class App extends Component {
  componentDidMount () {
    store.dispatch(fetchCompletedPoems())
    store.dispatch(refreshPoemCounts())
    store.dispatch(requestPromptRefresh())
  }

  render() {
    const longEnoughTooltip = (<Tooltip id='long_enough_explanation'>Requiring a minimum poem length has lead to more interesting poems and less trolling.</Tooltip>)
    return (
      <Provider store={store}>
        <Router>
          <div className='app'>
            <h1>Exquisite Corpse</h1>
            <ConnectedEditor />
            <Route exact path='/:id' component={ConnectedModalPoem} />
            <h4>What is this?</h4>
            <p>Collective, anonymous Internet poetry, written one line at a time.  Anybody can contribute a line, seeing only the one that came before.  Once a poem is long enough,
              <OverlayTrigger
                overlay={longEnoughTooltip}
              placement='top'>
                <sup><Glyphicon glyph='question-sign' /></sup>
              </OverlayTrigger>
            &nbsp;you can also choose to end it, at which point the whole thing becomes public.</p>
            <p>A RSS feed of completed poems is available <a href='http://exquisitecorpse.io/feed/completed'>here</a>.</p>
            <p>Exquisite Corpse began as a Surrealist parlor game in the early 20th century. I created this Internet version in 2008.  Read about its various incarnations (as it were) <a href="http://harpojaeger.com/2017/05/10/exquisite-corpse" target="_blank" rel="noopener noreferrer">here</a>, and find the tech specs/fine print <a href="https://github.com/harpojaeger/exquisite-corpse/blob/master/README.md">here</a>.</p>
            <p>Built by <a href="http://harpojaeger.com">Harpo Jaeger</a>. All poems written by random people on the Internet. This site doesn't collect or track any information about readers or contributors.</p>
            <ConnectedPoemContainer/>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
