import * as actionTypes from '../../utils/Constants/actionTypes'
import {orgCollection} from '../../FirebaseDb/firebase'

export const onSaveOrginationDetails = (details) =>{
   return{
    type:actionTypes.SAVE_ORG_DETAILS,
    orgDetails: mapOrgDetails(details)
   }
}

const mapOrgDetails= (details) => {
    return {
        type:actionTypes.SAVE_ORG_DETAILS,
        orgDetails: details
    }
}

export const initOnSaveOrgDetails = (details)=>{
    return dispatch =>{
        
        let params = {
            name :"david",
            job : "soft ware engineer 2"
        }
        orgCollection.add(params).then(snapshot=>{
   
            dispatch(mapOrgDetails(details))
        })
    }
}