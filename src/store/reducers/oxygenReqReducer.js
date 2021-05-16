import * as actionType from '../../utils/Constants/actionTypes'
import {updateState} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'

const initialState = {
    requesterID:null,
    plasmaRequestList:null,
    loading: false,
    isModelOpen:false,
    error:null,
    infoModel:false,
    infoMessage:null,
    phoneNumber:null
}

const startSavingPlasmaReq = (state,action) =>{
   return updateState(state,{loading:true,error:null,isModelOpen:false});
}

const onSavingPlasmaReq = (state,action) =>{
    return updateState(state,{loading:false, requesterID:action.id, error:null,isModelOpen:true,infoMessage:action.infoMessage,infoModel:true});
 }

 const errorSavingPlasmaReq = (state,action) =>{
    return updateState(state,{loading:false,error:action.error,isModelOpen:false});
 }

 const startFetchPlasmaReq = (state,action) =>{
    return updateState(state,{loading:true,error:null});
 }
 
 const onFetchPlasmaReq = (state,action) =>{
     return updateState(state,{loading:false, plasmaRequestList:action.plasmaReqDetails, error:null});
  }
 
  const errorFetchPlasmaReq = (state,action) =>{
     return updateState(state,{loading:false,error:action.error});
  }
  const onOpenForm = (state,action) =>{
   return updateState(state,{loading:false,error:null,isModelOpen:true});
  }
  const onCloseForm = (state,action) =>{
   return updateState(state,{loading:false,error:null,isModelOpen:false});
  }

  const phoneAltExits = (state,action) =>{
   return updateState(state,{isModelOpen:true,infoModel:true,infoMessage:`${action.phoneNumber} ${labi.PHONE_NUMBER_EXITS_MESSAGE}`})
}

const closeInfoModel = (state,action) =>{
   return updateState(state,{infoModel:false,infoMessage:null,isModelOpen:false})
}

const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionType.START_SAVE_PLASMA_REQ: return startSavingPlasmaReq(state,action)
        case actionType.ON_SAVE_PLASMA_REQ: return onSavingPlasmaReq(state,action)
        case actionType.ERROR_SAVE_PLASMA_REQ: return errorSavingPlasmaReq(state,action)
        case actionType.ON_CLICK_REQUESTER_MODAL : return onOpenForm(state,action);
        case actionType.START_FETCH_PLASMA_REQ: return startFetchPlasmaReq(state,action)
        case actionType.ON_FETCH_PLASMA_REQ: return onFetchPlasmaReq(state,action)
        case actionType.ERROR_FETCH_PLASMA_REQ: return errorFetchPlasmaReq(state,action)
        case actionType.ON_CLOSE_REQUESTER_MODAL : return onCloseForm(state,action);
        case actionType.PHONE_NUMBER_EXITS: return phoneAltExits(state,action)
        case actionType.CLOSE_INFO_MODAL: return closeInfoModel(state,action)


        default : return state;
    }

}

export default reducer;