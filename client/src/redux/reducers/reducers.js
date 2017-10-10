// Import action types
import { RECEIVE_COMPLETED_POEMS, DISPLAY_MORE_POEMS } from '../actions/completedPoems.js'

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
  poems: []
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

    default:
      return state
  }
}

export default app
