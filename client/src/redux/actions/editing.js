import { refreshPoemCounts } from './poemCounts'
import { fetchCompletedPoems } from './completedPoems'
const api = require('../../utils/api')
export const FETCH_NEW_PROMPT = 'FETCH_NEW_PROMPT'
export const PROMPT_REFRESHED = 'PROMPT_REFRESHED'
export const NEW_POEM_CREATED = 'NEW_POEM_CREATED'
export const NEW_LINE_ADDED = 'NEW_LINE_ADDED'


// Action creators to refresh the prompt
export function requestPromptRefresh(){
  return function(dispatch) {
    dispatch(fetchNewPrompt())
    api.random()
    .then(function(poem) {
      dispatch(promptRefreshed('VICTORY', poem.id, poem.lines[poem.lines.length-1], poem.lines.length))
    })
  }
}
export function fetchNewPrompt(){
  return { type: FETCH_NEW_PROMPT }
}
export function promptRefreshed(status, id, line, numlines){
  return {type: PROMPT_REFRESHED, status: status, id: id, line: line, numlines: numlines }
}

// Action creators to create a new poem
export function createNewPoem(line){
  return function(dispatch) {
    api.newpoem(line)
    .then(function(res) {
      console.log(res)
      dispatch(newPoemCreated('VICTORY'))
      dispatch(refreshPoemCounts())
    })
  }
}
export function newPoemCreated(status){
  return { type: NEW_POEM_CREATED, status: status }
}

// Action creators to add a new line to an existing poem
export function addNewLine(id, line, completed){
  return function(dispatch) {
    return api.nextline(id, line, completed)
    .then(function(res) {
      dispatch(requestPromptRefresh())
      dispatch(newLineAdded('VICTORY'))
      if(completed) {
        dispatch(refreshPoemCounts())
        dispatch(fetchCompletedPoems())
      }

    })
  }
}
export function newLineAdded(status){
  return { type: NEW_LINE_ADDED, status: status }
}
