const api = require('../../../utils/api')

export const DISPLAY_MORE_POEMS = 'DISPLAY_MORE_POEMS'
export const RECEIVE_COMPLETED_POEMS = 'RECEIVE_COMPLETED_POEMS'
export const SET_SORT_BY = 'SET_SORT_BY'
export const START_DATE = 'START_DATE'
export const END_DATE = 'END_DATE'
export const ASC = 'ASC'
export const DESC = 'DESC'
export const SET_SORT_ORDER = 'SET_SORT_ORDER'

export function fetchCompletedPoems(){
  return function(dispatch){
    return api.completed()
    .then( (poems) => {
      dispatch(receiveCompletedPoems('VICTORY', poems))
    })
  }
}

export function receiveCompletedPoems(status, poems){
  return { type: RECEIVE_COMPLETED_POEMS, status: status, poems: poems}
}

export function displayMorePoems(){
  return { type: DISPLAY_MORE_POEMS }
}

export function loadPoemByID(history, id){
  return function(dispatch){
    history.push(id)
  }
}

export function setSortBy(attribute){
  return { type: SET_SORT_BY, attribute: attribute }
}

export function setSortOrder(order){
  return { type: SET_SORT_ORDER, order: order }
}
