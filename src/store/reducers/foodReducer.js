import * as actionType from '../../utils/Constants/actionTypes'
import {updateState} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'
const initialState = {
    foodDonors:null,
    loading:false,
    foodRequester:null
}

const startFetchFoodDonors = (state,action) =>{
    return updateState(state,{loading:true,error:null});
}
 
 const onFetchFoodDonors = (state,action) =>{
     return updateState(state,{loading:false, foodDonors:action.foodDonors});
  }
 
  const errorFetchFoodDonors = (state,action) =>{
     return updateState(state,{loading:false,error:action.error});
}

const startFetchFoodReq = (state,action) =>{
    return updateState(state,{loading:true,error:null});
}
 
 const onFetchFoodReq = (state,action) =>{
     return updateState(state,{loading:false, foodRequester:action.foodReq});
  }
 
  const errorFetchFoodReq = (state,action) =>{
     return updateState(state,{loading:false,error:action.error});
}
const reducer = (state=initialState,action) =>{
    switch(action.type){
        // case actionType.START_SAVE_PLASMA_REQ: return startSavingPlasmaReq(state,action)
        // case actionType.ON_SAVE_PLASMA_REQ: return onSavingPlasmaReq(state,action)
        // case actionType.ERROR_SAVE_PLASMA_REQ: return errorSavingPlasmaReq(state,action)
        // case actionType.ON_CLICK_REQUESTER_MODAL : return onOpenForm(state,action);
        case actionType.START_FETCH_FOOD_DONATE: return startFetchFoodDonors(state,action)
        case actionType.ON_FETCH_FOOD_DONATE: return onFetchFoodDonors(state,action)
        case actionType.ERROR_FETCH_FOOD_DONATE: return errorFetchFoodDonors(state,action)

        case actionType.START_FETCH_FOOD_DONATE_REQ: return startFetchFoodReq(state,action)
        case actionType.ON_FETCH_FOOD_DONATE_REQ: return onFetchFoodReq(state,action)
        case actionType.ERROR_FETCH_FOOD_DONATE_REQ: return errorFetchFoodReq(state,action)


        default : return state;
    }

}

export default reducer;