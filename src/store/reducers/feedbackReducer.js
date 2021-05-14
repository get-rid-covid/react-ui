import * as actionType from '../../utils/Constants/actionTypes'
import {updateState} from '../../utils/updateData/updateState'
const initialState = {
    loading:false,
  isSuccessful:false,
  error:null,
  isModelOpen:false,
  filter:1,
}

const startSavingFeedBack = (state,action) =>{
   return updateState(state,{loading:true,error:null, isSuccessful:false});
}
const onSuccessSaveFeedback = (state,action) =>{
    return updateState(state,{loading:true,error:null, isSuccessful:true});
 }


 const errorSavingFeedBack = (state,action) =>{
    return updateState(state,{loading:false,error:action.error, isSuccessful:false});
 }

 const onCloseSuccess = (state,action) =>{
   return updateState(state,{isSuccessful:false,error:null});
  }
  const modalOpen = (state,action) =>{
    return updateState(state,{error:null,isModelOpen:true,isSuccessful:false});
   }
   const modalClose = (state,action) =>{
    return updateState(state,{isSuccessful:false,error:null,isModelOpen:false});
   }

  const startSavingDeactivation = (state,action) =>{
    return updateState(state,{loading:true,error:null, isSuccessful:false,isModelOpen:true});
 }
 const onSuccessSaveDeactivate = (state,action) =>{
     return updateState(state,{loading:true,error:null, isSuccessful:true,isModelOpen:true});
  }
 
 
  const errorSavingDeactivate = (state,action) =>{
     return updateState(state,{loading:false,error:action.error, isSuccessful:false,isModelOpen:false});
  }
 
   const onCloseDeactivate = (state,action) =>{
    return updateState(state,{isSuccessful:false,error:null,isModelOpen:false});
   }
   


const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionType.START_FEEDBACK: return startSavingFeedBack(state,action)
        case actionType.ON_SUCCESS_FEEDBACK: return onSuccessSaveFeedback(state,action)
        case actionType.ERROR_FEEDBACK: return errorSavingFeedBack(state,action)
        case actionType.ON_CLOSE_SUCCESS_FEEDBACK : return onCloseSuccess(state,action);
        case actionType.START_DEACTIVATE: return startSavingDeactivation(state,action)
        case actionType.ON_SUCCESS_DEACTIVATE: return onSuccessSaveDeactivate(state,action)
        case actionType.ERROR_DEACTIVATE: return errorSavingDeactivate(state,action)
        case actionType.ON_CLOSE_SUCCESS_DEACTIVATE : return onCloseDeactivate(state,action);
        case actionType.ON_CLICK_DEACTIVATE_MODAL : return modalOpen(state,action);
        case actionType.ON_CLOSE_DEACTIVATE_MODAL : return modalClose(state,action);
        default : return state;
    }

}

export default reducer;