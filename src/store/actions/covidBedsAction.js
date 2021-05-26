import * as actionTypes from '../../utils/Constants/actionTypes'
import {covidBedCollections,createdTime,covidBedReqCollections} from '../../FirebaseDb/firebase'
import {firebaseLooper} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'
import moment from 'moment'
import * as orgAction from './index'

export const initCovidBedSave = (details)=>{
    return dispatch =>{
        dispatch(startSaveCovidBeds())
        covidBedCollections.
        where('phoneNumber', '==',parseInt(details.phoneNumber))
        .get().then(snapShot =>{
            const dett = firebaseLooper(snapShot);
            if(dett.length===0){
                covidBedCollections.add({
                        ...details,
                        dataPrivacy:parseInt(details.dataPrivacy),
                        pincode:parseInt(details.pincode),
                        icuBeds_Qty:parseInt(details.icuBeds_Qty ? details.icuBeds_Qty : "0"),
                        onlyBeds_Qty:parseInt(details.onlyBeds_Qty ? details.onlyBeds_Qty : "0" ),
                        oxygenBeds_Qty:parseInt(details.oxygenBeds_Qty ? details.oxygenBeds_Qty : "0" ),
                        ventilatorBeds_Qty:parseInt(details.ventilatorBeds_Qty ? details.ventilatorBeds_Qty : "0" ),
                        phoneNumber: parseInt(details.phoneNumber),
                        createdTime:createdTime()
                    }).then(snapshot=>{
                        dispatch(onSaveCovidBeds(snapshot.id))
                        dispatch(orgAction.onCloseModal())
                        dispatch(fetchCovidBeds({}));
                        const message = 'Record successfully saved.'
                        dispatch(orgAction.onClickInfoModal(message))
                    }).catch(error =>{
                        dispatch(errorSaveCovidBeds(error))
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

export const startSaveCovidBeds = () =>{
    return{
        type:actionTypes.ON_FETCH_COVID_BEDS
    }
}

export const onSaveCovidBeds = (id) =>{
    return{
     type:actionTypes.ON_SAVE_COVID_BEDS,
     id:id,
     infoMessage: labi.SUCCESS_MSG
    }
 }

 export const errorSaveCovidBeds = () =>{
    return{
        type:actionTypes.ERROR_SAVE_COVID_BEDS
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

export  const fetchCovidBeds = (filterData) =>{
    return dispatch =>{
        dispatch(startFetchCovidBeds())
      const queries = covidBedCollections;
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
            dispatch(onFetchCovidBeds(details))
        })
        .catch(error=>{
            dispatch(errorFetchCovidBeds(error))
    })
    } 
}

export const onFetchCovidBeds = (details) =>{
    return{
         type:actionTypes.ON_FETCH_COVID_BEDS,
          covidBeds:details  
    }
}

export const startFetchCovidBeds = () =>{
    return{
     type:actionTypes.START_FETCH_PLASMA
    }
 }
 export const errorFetchCovidBeds = (error) =>{
    return{
     type:actionTypes.ERROR_FETCH_COVID_BEDS,
     error:error
    }
 }

//COVID BED REQUESTS
export const initCovidRequests = (details)=>{
    return dispatch =>{
        dispatch(startSaveCovidBedsReq())
        covidBedReqCollections.
        where('phoneNumber', '==',parseInt(details.phoneNumber))
        .get().then(snapShot =>{
            const dett = firebaseLooper(snapShot);
            if(dett.length===0){
                covidBedReqCollections.add({
                        ...details,
                        dataPrivacy:parseInt(details.dataPrivacy),
                        pincode:parseInt(details.pincode),
                        phoneNumber: parseInt(details.phoneNumber),
                        createdTime:createdTime()
                    }).then(snapshot=>{
                        dispatch(onSaveCovidBedsReq(snapshot.id))
                        dispatch(fetchCovidBedsReq({}));
                        dispatch(orgAction.onCloseModal())
                        const message = 'Record successfully saved.'
                        dispatch(orgAction.onClickInfoModal(message))
                    }).catch(error =>{
                        dispatch(errorSaveCovidBedsReq(error))
                    }) 
            }
            else{
                const message = 'Already a records exists with ' +dett[0].phoneNumber +'. Change phone number and register'
                dispatch(orgAction.onClickInfoModal(message))
            }   
        }).catch(err =>{
            dispatch(errorSaveCovidBedReq(err))
        })
        
    }
}

export const startSaveCovidBedsReq = () =>{
    return{
        type:actionTypes.START_SAVE_COVID_BEDS
    }
}

export const onSaveCovidBedsReq = (id) =>{
    return{
     type:actionTypes.ON_SAVE_COVID_BEDS,
     id:id,
     infoMessage: labi.SUCCESS_MSG
    }
 }

 export const errorSaveCovidBedsReq = () =>{
    return{
        type:actionTypes.ERROR_SAVE_COVID_BEDS
    }
}



export const errorSaveCovidBedReq = () =>{
    return{
        type:actionTypes.ERROR_SAVE_COVID_BEDS
    }
}

export  const fetchCovidBedsReq = (filterData) =>{
    return dispatch =>{
        dispatch(startFetchCovidBedsReq())
      const queries = covidBedReqCollections;
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
            dispatch(onFetchCovidBedsReq(details))
        })
        .catch(error=>{
            dispatch(errorFetchCovidBedsReq(error))
    })
    } 
}

export const onFetchCovidBedsReq = (details) =>{
    return{
         type:actionTypes.ON_FETCH_COVID_BEDS_REQ,
          covidBedsReq:details  
    }
}

export const startFetchCovidBedsReq = () =>{
    return{
     type:actionTypes.START_FETCH_PLASMA_REQ
    }
 }
 export const errorFetchCovidBedsReq = (error) =>{
    return{
     type:actionTypes.ERROR_FETCH_COVID_BEDS_REQ,
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