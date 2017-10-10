const api = require('../../../utils/api')

export const DISPLAY_MORE_POEMS = 'DISPLAY_MORE_POEMS'

export const FETCH_COMPLETED_POEMS = 'FETCH_COMPLETED_POEMS'

export const RECEIVE_COMPLETED_POEMS = 'RECEIVE_COMPLETED_POEMS'

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
