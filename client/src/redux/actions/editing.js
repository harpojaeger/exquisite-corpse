// These actions will be triggered by the user through UI interactions.
export const SUBMIT_NEW_POEM = 'SUBMIT_NEW_POEM'
export const SUBMIT_NEW_LINE = 'SUBMIT_NEW_LINE'
export const REQUEST_PROMPT_REFRESH = 'REQUEST_PROMPT_REFRESH'

// These will be triggered by the app when an API request returns, in order to update the application state.
export const NEW_POEM_CREATED = 'NEW_POEM_CREATED'
export const NEW_LINE_ADDED = 'NEW_LINE_ADDED'
export const PROMPT_REFRESHED = 'PROMPT_REFRESHED'

// Action creators
export function submitNewPoem(line){
  return { type: SUBMIT_NEW_POEM, line: line }
}
export function submitNewLine(id, line){
  return{ type: SUBMIT_NEW_LINE, id: id, line: line }
}
export function requestPromptRefresh(){
  return { type: REQUEST_PROMPT_REFRESH }
}

export function newPoemCreated(status){
  return { type: NEW_POEM_CREATED, status: status }
}
export function newLineAdded(status){
  return { type: NEW_LINE_ADDED, status: status }
}
export function promptRefreshed(status, id, line){
  return {type: PROMPT_REFRESHED, status: status, id: id, line: line }
}
