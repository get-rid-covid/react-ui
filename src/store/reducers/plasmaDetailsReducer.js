import * as actionType from '../../utils/Constants/actionTypes'
import {updateState} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'

const initialState = {
    donarId:null,
    donarList:null,
    loading: false,
    isModelOpen:false,
    error:null,
    isFilter:false,
    infoModel:false,
    infoMessage:null,
    phoneNumber:null
}

const startSavingPlasmaInfo = (state,action) =>{
   return updateState(state,{loading:true,error:null,isModelOpen:false});
}

const onSavingPlasmaInfo = (state,action) =>{
    return updateState(state,{loading:false, donarId:action.id, error:null,isModelOpen:true,infoModel:true,infoMessage:action.infoMessage});
 }

 const errorSavingPlasmaInfo = (state,action) =>{
    return updateState(state,{loading:false,error:action.error,isModelOpen:false});
 }

 const startFetchPlasmaInfo = (state,action) =>{
    return updateState(state,{loading:true,error:null});
 }
 
 const onFetchPlasmaInfo = (state,action) =>{
     return updateState(state,{loading:false, donarList:action.donarDetails, error:null});
  }
 
  const errorFetchPlasmaInfo = (state,action) =>{
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
        case actionType.START_SAVE_PLASMA: return startSavingPlasmaInfo(state,action)
        case actionType.ON_SAVE_PLASMA: return onSavingPlasmaInfo(state,action)
        case actionType.ERROR_SAVE_PLASMA: return errorSavingPlasmaInfo(state,action)
         case actionType.ON_CLICK_DONAR_MODAL : return onOpenForm(state,action);
        case actionType.START_FETCH_PLASMA: return startFetchPlasmaInfo(state,action)
        case actionType.ON_FETCH_PLASMA: return onFetchPlasmaInfo(state,action)
        case actionType.ERROR_FETCH_PLASMA: return errorFetchPlasmaInfo(state,action)
        case actionType.ON_CLOSE_DONAR_MODAL: return onCloseForm(state,action)
        case actionType.PHONE_NUMBER_EXITS: return phoneAltExits(state,action)
        case actionType.CLOSE_INFO_MODAL: return closeInfoModel(state,action)
        case actionType.OPEN_FILTER : return openFilterModel(state,action)
        case actionType.CLOSE_FILTER : return closeFilterModel(state,action);
        default : return state;
    }

}

export default reducer;