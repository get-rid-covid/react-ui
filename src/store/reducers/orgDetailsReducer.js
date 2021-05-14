import * as actionType from '../../utils/Constants/actionTypes'

const initialState = {
    orgDetails:null
}
const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionType.SAVE_ORG_DETAILS:
            return {
                ...state,
                orgDetails:action.orgDetails
            }
    }

    return state;
}

export default reducer;