// в reducer будет приниматься тип action в Error Reducer
export const  createErrorReducer = actionType => 
  (state = null, action) =>{
    switch(action.type){
      case `${actionType}_INIT`:
        return null;
      case `${actionType}_ERROR`:
        return action.error;
      default:
        return state;
    }
  }

// в reducer будет приниматься тип action
export const createIsCheckingReducer = actionType => 
  (state = false, action) =>{
    switch(action.type){
      case `${actionType}_INIT`:
        return true;
      case `${actionType}_SUCCESS`:
      case `${actionType}_ERROR`:
        return false;
      default:
        return state;
    }
  }
