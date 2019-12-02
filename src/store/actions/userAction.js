import * as types from '../mutations-types';

const userAction = {
  dispatchAsync: (promise) => {
    debugger
    promise.then( (response) => {
      return {
        type: 'SUCCESS',
        payload: Object.assign({}, { response })
      }
    }).catch( (response) => {
      return {
        type: 'ERROR',
        payload: Object.assign({}, { response })
      }
    })
  }
}

export default userAction;