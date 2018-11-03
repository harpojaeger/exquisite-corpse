import api from '../../utils/api.js'
export const UPDATE_COMPLETED_COUNT = 'UPDATE_COMPLETED_COUNT'
export const UPDATE_UNCOMPLETED_COUNT = 'UPDATE_UNCOMPLETED_COUNT'

export function refreshUncompletedCount(){
  return dispatch =>
    api.countUncompleted()
    .then( (count) => {
      dispatch(updateUncompletedCount(count))
    })
}

export function refreshCompletedCount(){
  return dispatch =>
    api.countCompleted()
    .then( (count) => {
      dispatch(updateCompletedCount(count))
    })
}

export function refreshPoemCounts(){
  return dispatch => Promise.all([
    dispatch(refreshUncompletedCount()),
    dispatch(refreshCompletedCount())
  ])
}

export function updateUncompletedCount(uncompleted) {
  return {
    type: UPDATE_UNCOMPLETED_COUNT,
    uncompleted: uncompleted,
  }
}

export function updateCompletedCount(completed) {
  return {
    type: UPDATE_COMPLETED_COUNT,
    completed: completed,
  }
}
