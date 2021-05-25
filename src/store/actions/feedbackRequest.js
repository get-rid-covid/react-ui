import * as actionTypes from '../../utils/Constants/actionTypes'
import {feedbackCollections,createdTime,deactivateCollections} from '../../FirebaseDb/firebase'


export const initFeedBackSave = (details)=>{
    return dispatch =>{
        dispatch(startFeedBack())
        feedbackCollections.add({
            ...details,
            phoneNumber: parseInt(details.phoneNumber),
            createdTime:createdTime()
        }).then(snapshot=>{
            dispatch(onSaveFeedback());
            
        }).catch(error =>{
            dispatch(errorFeedBack(error))
        })
    }
}

export const onSaveFeedback = () =>{
    return{
     type:actionTypes.ON_SUCCESS_FEEDBACK,
    }
 }
 
 export const startFeedBack = () =>{
    return{
     type:actionTypes.START_FEEDBACK
    }
 }
 export const errorFeedBack = (error) =>{
    return{
     type:actionTypes.ERROR_FEEDBACK,
     error:error
    }
 }
 export const onClickCloseFeedBack = () =>{
    return{
     type:actionTypes.ON_CLOSE_SUCCESS_FEEDBACK,
 
    }
 }
 

 
export const initDeactivateRecord = (details)=>{
    return dispatch =>{
        dispatch(startdeactivatingRecord())
        deactivateCollections.add({
            ...details,
            phoneNumber: parseInt(details.phoneNumber),
            createdTime:createdTime()
        }).then(snapshot=>{
            dispatch(onDeactivate());
            
        }).catch(error =>{
            dispatch(errorDeactivate(error))
        })
    }
}

export const onDeactivate = () =>{
    return{
     type:actionTypes.ON_SUCCESS_DEACTIVATE,
    }
 }
 
 export const startdeactivatingRecord = () =>{
    return{
     type:actionTypes.START_DEACTIVATE
    }
 }
 export const errorDeactivate = (error) =>{
    return{
     type:actionTypes.ERROR_DEACTIVATE,
     error:error
    }
 }
 export const onClickCloseDeactivate = () =>{
    return{
     type:actionTypes.ON_CLOSE_SUCCESS_DEACTIVATE,
 
    }
 }
    export const onClickDeactivateForm = () =>{
        return{
         type:actionTypes.ON_CLICK_DEACTIVATE_MODAL
     
        }
 }

 export const onCloseDeactivateForm = () =>{
    return{
     type:actionTypes.ON_CLOSE_DEACTIVATE_MODAL
 
    }
}
export const onClickOxygenDeactivateForm = () =>{
    return{
     type:actionTypes.ON_CLICK_OXYGEN_DEACTIVATE_MODAL
 
    }
}

export const onCloseOxygenDeactivateForm = () =>{
return{
 type:actionTypes.ON_CLOSE_OXYGEN_DEACTIVATE_MODAL

}
}

