
import * as actionType from '../../utils/Constants/actionTypes'
import {updateState} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'

const initialState = {
    requesterID:null,
    oxygenRequestList:null,
    loading: false,
    isModelOpen:false,
    error:null,
    infoModel:false,
    infoMessage:null,
    phoneNumber:null
}


const onOpenForm = (state,action) =>{
    return updateState(state,{loading:false,error:null,isModelOpen:true});
   }
   const startSavingOxygenReq = (state,action) =>{
    return updateState(state,{loading:true,error:null,isModelOpen:false});
 }
 const onSavingOxygenReq = (state,action) =>{
    return updateState(state,{loading:false, requesterID:action.id, error:null,isModelOpen:true,infoMessage:action.infoMessage,infoModel:true});
 }
 const startFetchOxygenReq = (state,action) =>{
    return updateState(state,{loading:true,error:null});
 }
 const onFetchOxygenReq = (state,action) =>{
    return updateState(state,{loading:false, oxygenRequestList:action.oxygenReqDetails, error:null});
 }
 
 const errorFetchOxygenReq = (state,action) =>{
    return updateState(state,{loading:false,error:action.error});
 }
 const errorSavingOxygenReq = (state,action) =>{
    return updateState(state,{loading:false,error:action.error,isModelOpen:false});
 }
 const phoneAltExits = (state,action) =>{
    return updateState(state,{isModelOpen:true,infoModel:true,infoMessage:`${action.phoneNumber} ${labi.PHONE_NUMBER_EXITS_MESSAGE}`})
 }
 const onCloseForm = (state,action) =>{
   return updateState(state,{loading:false,error:null,isModelOpen:false,infoModel:false});
  }
const reducer = (state=initialState,action) =>{
   
    switch(action.type){
        case actionType.ON_CLICK_OXYGEN_REQUESTER_MODAL : return onOpenForm(state,action);
        case actionType.START_SAVE_OXYGEN_REQ: return startSavingOxygenReq(state,action);
        case actionType.ON_SAVE_OXYGEN_REQ: return onSavingOxygenReq(state,action);
        case actionType.START_FETCH_OXYGEN_REQ: return startFetchOxygenReq(state,action);
        case actionType.ON_FETCH_OXYGEN_REQ: return onFetchOxygenReq(state,action);
        case actionType.ERROR_FETCH_OXYGEN_REQ: return errorFetchOxygenReq(state,action);
        case actionType.ERROR_SAVE_OXYGEN_REQ: return errorSavingOxygenReq(state,action);
        case actionType.PHONE_NUMBER_EXITS: return phoneAltExits(state,action);
        case actionType.ON_CLOSE_OXYGEN_REQUESTER_MODAL : return onCloseForm(state,action);
        default : return state;
    }

   }
export default reducer;