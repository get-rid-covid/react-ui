import * as actionType from '../../utils/Constants/actionTypes'
import {updateState} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'
const initialState = {
    covidBeds:null,
    loading:false,
    covidBedsReq:null
}

const startFetchCovidBeds = (state,action) =>{
    return updateState(state,{loading:true,error:null});
}
 
 const onFetchCovidBeds = (state,action) =>{
     return updateState(state,{loading:false, covidBeds:action.covidBeds});
  }
 
  const errorFetchCovidBeds = (state,action) =>{
     return updateState(state,{loading:false,error:action.error});
}

const startFetchCovidBedsReq = (state,action) =>{
    return updateState(state,{loading:true,error:null});
}
 
 const onFetchCovidBedsReq = (state,action) =>{
     return updateState(state,{loading:false, covidBedsReq:action.covidBedsReq});
  }
 
  const errorFetchCovidBedsReq = (state,action) =>{
     return updateState(state,{loading:false,error:action.error});
}
const reducer = (state=initialState,action) =>{
    switch(action.type){
        // case actionType.START_SAVE_PLASMA_REQ: return startSavingPlasmaReq(state,action)
        // case actionType.ON_SAVE_PLASMA_REQ: return onSavingPlasmaReq(state,action)
        // case actionType.ERROR_SAVE_PLASMA_REQ: return errorSavingPlasmaReq(state,action)
        // case actionType.ON_CLICK_REQUESTER_MODAL : return onOpenForm(state,action);
        case actionType.START_FETCH_COVID_BEDS: return startFetchCovidBeds(state,action)
        case actionType.ON_FETCH_COVID_BEDS: return onFetchCovidBeds(state,action)
        case actionType.ERROR_FETCH_COVID_BEDS: return errorFetchCovidBeds(state,action)

        case actionType.START_FETCH_COVID_BEDS_REQ: return startFetchCovidBedsReq(state,action)
        case actionType.ON_FETCH_COVID_BEDS_REQ: return onFetchCovidBedsReq(state,action)
        case actionType.ERROR_FETCH_COVID_BEDS_REQ: return errorFetchCovidBedsReq(state,action)


        default : return state;
    }

}

export default reducer;