import * as actionType from '../../utils/Constants/actionTypes'
import {updateState} from '../../utils/updateData/updateState'
const initialState = {
  loading:false,
  isSuccessful:false,
  error:null,
  isModelOpen:false,
  infoModel:false,
  infoMessage:null,
}

const startAuth = (state,action) =>{
    return updateState(state,{loading:true,error:null,isModelOpen:true});
 }
 const onSuccessAuth  = (state,action) =>{
    return updateState(state,{loading:false,error:null,isModelOpen:false});
 }
 const errorAuth  = (state,action) =>{
    return updateState(state,{loading:false,error:true,isModelOpen:true,infoModel:true,infoMessage:action.message });
 }
 const closeInfoBox  = (state,action) =>{
    return updateState(state,{loading:false,error:true,isModelOpen:false,infoModel:false,infoMessage:null });
 }


const errorLogout  = (state,action) =>{
   return updateState(state,{loading:false,error:true,isModelOpen:true,infoModel:true,infoMessage:action.message });
}
const openLoginModel = (state,action) =>{
   return updateState(state,{loading:true,error:null,isModelOpen:true});
}

const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionType.START_AUTH: return startAuth(state,action);
        case actionType.AUTH_SUCCESS: return onSuccessAuth(state,action);
        case actionType.ERROR_AUTH: return errorAuth(state,action);
        
       // case actionType.START_LOGOUT: return startLogout(state,action);
       // case actionType.CLOSE_LOGIN_MODEL: return onSuccessAuth(state,action);
        case actionType.ERROR_LOGOUT: return errorLogout(state,action);
        case actionType.OPEN_LOGIN_MODEL: return openLoginModel(state,action);


        case actionType.ON_CLOSE_INFO_BOX: return closeInfoBox(state,action)
        default : return state;
    }

}

export default reducer;