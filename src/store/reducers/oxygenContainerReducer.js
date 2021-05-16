import * as actionType from '../../utils/Constants/actionTypes'
import {updateState} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'

const initialState = {
    dealerId:null,
    dealerList:null,
    loading: false,
    isModelOpen:false,
    error:null,
    isFilter:false,
    infoModel:false,
    infoMessage:null,
    phoneNumber:null
}

const startSavingOxygenInfo = (state,action) =>{
   return updateState(state,{loading:true,error:null,isModelOpen:false});
}

const onSavingOxygenInfo = (state,action) =>{
    return updateState(state,{loading:false, donarId:action.id, error:null,isModelOpen:true,infoModel:true,infoMessage:action.infoMessage});
 }

 const errorSavingOxygenInfo = (state,action) =>{
    return updateState(state,{loading:false,error:action.error,isModelOpen:false});
 }

 const startFetchOxygenInfo = (state,action) =>{
    return updateState(state,{loading:true,error:null});
 }
 
 const onFetchOxygenInfo = (state,action) =>{
     return updateState(state,{loading:false, donarList:action.donarDetails, error:null});
  }
 
  const errorFetchOxygenInfo = (state,action) =>{
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
const openFilterModel = (state,action) =>{
   return updateState(state,{loading:false,error:null,isFilter:true});
  }
const closeFilterModel = (state,action) =>{
   return updateState(state,{loading:false,error:null,isFilter:false});
  }

const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionType.START_SAVE_OXYGEN: return startSavingOxygenInfo(state,action)
        case actionType.ON_SAVE_OXYGEN: return onSavingOxygenInfo(state,action)
        case actionType.ERROR_SAVE_OXYGEN: return errorSavingOxygenInfo(state,action)
         case actionType.ON_CLICK_DEALER_MODAL : return onOpenForm(state,action);
        case actionType.START_FETCH_OXYGEN: return startFetchOxygenInfo(state,action)
        case actionType.ON_FETCH_OXYGEN: return onFetchOxygenInfo(state,action)
        case actionType.ERROR_FETCH_OXYGEN: return errorFetchOxygenInfo(state,action)
        case actionType.ON_CLOSE_DONAR_MODAL: return onCloseForm(state,action)
        case actionType.PHONE_NUMBER_EXITS: return phoneAltExits(state,action)
        case actionType.CLOSE_INFO_MODAL: return closeInfoModel(state,action)
        case actionType.OPEN_FILTER : return openFilterModel(state,action)
        case actionType.CLOSE_FILTER : return closeFilterModel(state,action);
        default : return state;
    }

}

export default reducer;