// Import action types
import { RECEIVE_COMPLETED_POEMS, DISPLAY_MORE_POEMS, SET_SORT_ORDER, SET_SORT_BY, START_DATE, END_DATE, ASC, DESC } from '../actions/completedPoems.js'
import { UPDATE_UNCOMPLETED_COUNT, UPDATE_COMPLETED_COUNT } from '../actions/poemCounts.js'
import { FETCH_NEW_PROMPT, PROMPT_REFRESHED, NEW_POEM_CREATED } from '../actions/editing.js'

const initialState = {
  // Is the poem prompt loading?
  promptloading: true,

  //This is UI state for the completed poem listing
  // Should the 'load more' button be displayed?
  displayLoadMore: true,
  // How many poems should be loaded the next time the 'load more' button is clicked?
  quantity: 50,
  // Slice the completed poem array from 0 to this number:
  to: 50,
  poems: [],

  // Current number of completed & uncompleted poems
  completed: 0,
  uncompleted: 0,

  // Sorting options for completed poems
  sort_by: END_DATE,
  sort_order: DESC
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
    case SET_SORT_BY:
      // Check to see that the sort attribute is valid
      if(![START_DATE, END_DATE].includes(action.attribute)) return state
      return Object.assign({}, state, {
        sort_by: action.attribute
      })
    case SET_SORT_ORDER:
      // Check to see that the sort order is valid
      if(![ASC, DESC].includes(action.order)) return state
      return Object.assign({}, state, {
        sort_order: action.order
      })
    default:
      return state
  }
}

export default app
