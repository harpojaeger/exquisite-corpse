export const REQUEST_COMPLETED_POEMS = 'REQUEST_COMPLETED_POEMS'
export const DISPLAY_MORE_POEMS = 'DISPLAY_MORE_POEMS'

export const RECEIVE_COMPLETED_POEMS = 'RECEIVE_COMPLETED_POEMS'

export function requestCompletedPoems(){
  return { type: REQUEST_COMPLETED_POEMS }
}
export function displayMorePoems(){
  return { type: DISPLAY_MORE_POEMS }
}

export function receiveCompletedPoems(status){
  return { type: RECEIVE_COMPLETED_POEMS, status: status }
}
