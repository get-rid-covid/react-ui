import * as actionType from '../../utils/Constants/actionTypes'
import {updateState} from '../../utils/updateData/updateState'
const initialState = {
modalType:null,
  isModelOpen:false,
  infoModel:false,
  infoMessage:null,
  modalType:null
}
const openModal = (state, action) =>{
    return updateState(state,{isModelOpen:true,modalType:action.modalType})
}

const closeModal = (state, action) =>{
    return updateState(state,{isModelOpen:false,modalType:null})
}

const openInfoModal = (state, action) =>{
    return updateState(state,{infoModel:true,infoMessage:action.message})
}

const closeInfoModal = (state, action) =>{
    return updateState(state,{infoModel:false,infoMessage:null})
}
const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionType.OPEN_MODAL: return openModal(state,action)
        case actionType.CLOSE_MODAL: return closeModal(state,action)
        case actionType.OPEN_INFO_MODAL: return openInfoModal(state,action)
        case actionType.CLOSE_INFO_MODAL: return closeInfoModal(state,action)
        default : return state;
    }

}

export default reducer;