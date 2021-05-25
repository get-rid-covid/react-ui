import * as actionTypes from '../../utils/Constants/actionTypes'
import {foodDonateCollections,createdTime,foodReqCollections} from '../../FirebaseDb/firebase'
import {firebaseLooper} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'
import moment from 'moment'
import * as orgAction from './index'

export const initFoodDonate = (details)=>{
    return dispatch =>{
        dispatch(startSaveFoodDonate())
        foodDonateCollections.
        where('phoneNumber', '==',parseInt(details.phoneNumber))
        .get().then(snapShot =>{
            const dett = firebaseLooper(snapShot);
            if(dett.length===0){
                foodDonateCollections.add({
                        ...details,
                        dataPrivacy:parseInt(details.dataPrivacy),
                        pincode:parseInt(details.pincode),
                        phoneNumber: parseInt(details.phoneNumber),
                        createdTime:createdTime()
                    }).then(snapshot=>{
                        dispatch(onSaveFoodDonate(snapshot.id))
                        dispatch(orgAction.onCloseModal())
                        dispatch(fetchFoodDonate({}));
                    }).catch(error =>{
                        dispatch(errorSaveFoodDonate(error))
                    }) 
            }
            else{
                const message = 'Already a records exists with ' +dett[0].phoneNumber +'. Change phone number and register'
                dispatch(orgAction.onClickInfoModal(message))
            }   
        }).catch(err =>{
            dispatch(errorSaveCovidBed(err))
        })
        
    }
}

export const startSaveFoodDonate = () =>{
    return{
        type:actionTypes.START_SAVE_FOOD_DONATE
    }
}

export const onSaveFoodDonate = (id) =>{
    return{
     type:actionTypes.ON_SAVE_FOOD_DONATE,
     id:id,
     infoMessage: labi.SUCCESS_MSG
    }
 }

 export const errorSaveFoodDonate = (error) =>{
    return{
        type:actionTypes.ERROR_SAVE_FOOD_DONATE,
        error:error
    }
}

export const phoneNumExits = (number) =>{
    return{
        type:actionTypes.PHONE_NUMBER_EXITS,
        message:'Already a records exists with ' +number +'. Change phone number and register'
    }
}

export const errorSaveCovidBed = () =>{
    return{
        type:actionTypes.ERROR_SAVE_COVID_BEDS
    }
}

export  const fetchFoodDonate = (filterData) =>{
    return dispatch =>{
        dispatch(startFetchFoodDonate())
      const queries = foodDonateCollections;
          const lastMonthDate =  new Date(moment(new Date()).subtract(30,'days'));
        const arr = []
        arr.push(`queries.where('dataPrivacy','==',1)`)
        if(!(Object.keys(filterData).length === 0 && filterData.constructor === Object)){
            // if(filterData.state){
            //     arr.push(`where("state","==",'${filterData.state}')`)    
            // }
            if(filterData.districts){
                arr.push(`where("districts","==",'${filterData.districts}')`)    
    
            }
            if(filterData.phoneNumber){
                arr.push(`where("phoneNumber","==",${parseInt(filterData.phoneNumber)})`)
            }
            if(filterData.pincode){
                arr.push(`where("pincode","==",${parseInt(filterData.pincode)})`)
            }
        }
        const query = arr.slice(0,arr.length).join('.')
        eval(query).get()
        .then(snapShot =>{
            const details = firebaseLooper(snapShot);
            dispatch(onFetchFoodDonate(details))
        })
        .catch(error=>{
            dispatch(errorFetchFoodDonate(error))
    })
    } 
}

export const onFetchFoodDonate = (details) =>{
    return{
         type:actionTypes.ON_FETCH_FOOD_DONATE,
          foodDonors:details  
    }
}

export const startFetchFoodDonate = () =>{
    return{
     type:actionTypes.START_FETCH_FOOD_DONATE
    }
 }
 export const errorFetchFoodDonate = (error) =>{
    return{
     type:actionTypes.ERROR_FETCH_FOOD_DONATE,
     error:error
    }
 }

//COVID BED REQUESTS
export const initFoodRequests = (details)=>{
    return dispatch =>{
        dispatch(startSaveFoodReq())
        foodReqCollections.
        where('phoneNumber', '==',parseInt(details.phoneNumber))
        .get().then(snapShot =>{
            const dett = firebaseLooper(snapShot);
            if(dett.length===0){
                foodReqCollections.add({
                        ...details,
                        dataPrivacy:parseInt(details.dataPrivacy),
                        pincode:parseInt(details.pincode),
                        phoneNumber: parseInt(details.phoneNumber),
                        createdTime:createdTime()
                    }).then(snapshot=>{
                        dispatch(onSaveFoodReq(snapshot.id))
                        dispatch(fetchFoodReq({}));
                        dispatch(orgAction.onCloseModal())
                    }).catch(error =>{
                        dispatch(errorSaveFoodReq(error))
                    }) 
            }
            else{
                dispatch(phoneNumExits(dett[0].phoneNumber))
            }   
        }).catch(err =>{
            dispatch(errorSaveCovidBedReq(err))
        })
        
    }
}

export const startSaveFoodReq = () =>{
    return{
        type:actionTypes.START_SAVE_FOOD_DONATE_REQ
    }
}

export const onSaveFoodReq = (id) =>{
    return{
     type:actionTypes.ON_SAVE_FOOD_DONATE_REQ,
     id:id,
     infoMessage: labi.SUCCESS_MSG
    }
 }

 export const errorSaveFoodReq = () =>{
    return{
        type:actionTypes.ERROR_SAVE_FOOD_DONATE_REQ
    }
}



export const errorSaveCovidBedReq = () =>{
    return{
        type:actionTypes.ERROR_SAVE_FOOD_DONATE_REQ
    }
}





export  const fetchFoodReq = (filterData) =>{
    return dispatch =>{
        dispatch(startFetchFoodReq())
      const queries = foodReqCollections
      
        ;
          const lastMonthDate =  new Date(moment(new Date()).subtract(30,'days'));
        const arr = []
        arr.push(`queries.where('dataPrivacy','==',1)`)
        if(!(Object.keys(filterData).length === 0 && filterData.constructor === Object)){
            // if(filterData.state){
            //     arr.push(`where("state","==",'${filterData.state}')`)    
            // }
            if(filterData.districts){
                arr.push(`where("districts","==",'${filterData.districts}')`)    
    
            }
            if(filterData.phoneNumber){
                arr.push(`where("phoneNumber","==",${parseInt(filterData.phoneNumber)})`)
            }
            if(filterData.pincode){
                arr.push(`where("pincode","==",${parseInt(filterData.pincode)})`)
            }
        }
        const query = arr.slice(0,arr.length).join('.')
        eval(query).get()
        .then(snapShot =>{
            const details = firebaseLooper(snapShot);
            dispatch(onFetchFoodReq(details))
        })
        .catch(error=>{
            dispatch(errorFetchFoodReq(error))
    })
    } 
}

export const onFetchFoodReq = (details) =>{
    return{
         type:actionTypes.ON_FETCH_FOOD_DONATE_REQ,
          foodReq:details  
    }
}

export const startFetchFoodReq = () =>{
    return{
     type:actionTypes.START_FETCH_FOOD_DONATE_REQ
    }
 }
 export const errorFetchFoodReq = (error) =>{
    return{
     type:actionTypes.ERROR_FETCH_FOOD_DONATE_REQ,
     error:error
    }
 }


//startSaveCovidBeds
//onSaveCovidBeds
//errorSaveCovidBeds

export const closeInfoModal = () =>{
    return{
        type:actionTypes.CLOSE_INFO_MODAL
    }
}

 export const onClickFilter = () =>{
    return{
        type:actionTypes.OPEN_FILTER
    } 
 }