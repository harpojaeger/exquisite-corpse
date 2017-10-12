// Import action types
import { RECEIVE_COMPLETED_POEMS, DISPLAY_MORE_POEMS } from '../actions/completedPoems.js'
import { UPDATE_UNCOMPLETED_COUNT, UPDATE_COMPLETED_COUNT } from '../actions/poemCounts.js'
import { FETCH_NEW_PROMPT, PROMPT_REFRESHED, NEW_POEM_CREATED } from '../actions/editing.js'

const initialState = {
  // These two are UI state for the editor
  // Is the poem prompt loading?
  promptloading: true,
  // Is the current poem long enough to be ended?
  endable: false,

  //This is UI state for the completed poem listing
  // Should the 'load more' button be displayed?
  displayLoadMore: true,
  // How many poems should be loaded the next time the 'load more' button is clicked?
  quantity: 50,
  // Slice the completed poem array from 0 to this number:
  to: 50,
  poems: [],
  completed: 0,
  uncompleted: 0,
}

function app(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_COMPLETED_POEMS:
      return Object.assign({}, state, {
      poems: action.poems
    })
    case DISPLAY_MORE_POEMS:
      return Object.assign({}, state, {
        to: state.to + state.quantity,
        quantity: Math.min(state.quantity, state.poems.length - state.to - state.quantity),
        displayLoadMore: ((state.to + state.quantity) < state.poems.length)
      })
    case UPDATE_UNCOMPLETED_COUNT:
      return Object.assign({}, state, {
        uncompleted: action.uncompleted
      })
    case UPDATE_COMPLETED_COUNT:
      return Object.assign({}, state, {
        completed: action.completed
      })
    case FETCH_NEW_PROMPT:
      return Object.assign({}, state, {
        promptloading: true
      })
    case PROMPT_REFRESHED:
      return Object.assign({}, state, {
        promptloading: false,
        id: action.id,
        nextline: action.line,
        numlines: action.numlines,
      })
    case NEW_POEM_CREATED:
      return state

    default:
      return state
  }
}

export default app
