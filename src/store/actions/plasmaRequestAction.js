import * as actionTypes from '../../utils/Constants/actionTypes'
import {plasmaRequestCollection,createdTime} from '../../FirebaseDb/firebase'
import {firebaseLooper} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'
import moment from 'moment'

export const initSavePlasmaRequest = (details)=>{
    return dispatch =>{
        dispatch(startSavePlasmaReq())
        plasmaRequestCollection.where('phoneNumber', '==',parseInt(details.phoneNumber))
        .get().then(snapShot =>{
            const dett = firebaseLooper(snapShot);
            if(dett.length==0){
                plasmaRequestCollection.add({
                    ...details,
                    age:parseInt(details.age),
                    dataPrivacy:parseInt(details.dataPrivacy),
                    pincode:parseInt(details.pincode),
                    phoneNumber: parseInt(details.phoneNumber),
                    createdTime:createdTime()
                }).then(snapshot=>{
                    dispatch(onSavePlasmaDonarReq(snapshot.id));
                    dispatch(fetchPlasmaReq({}))
                }).catch(error =>{
                    dispatch(errorSavePlasmaReq(error))
                })
            }
            else{
                dispatch(phoneNumExits(dett[0].phoneNumber))
            }   
        }).catch(err =>{
            dispatch(errorSavePlasmaReq(err))
        })
        
    }
}

export const phoneNumExits = (number) =>{
    return{
        type:actionTypes.PHONE_NUMBER_EXITS,
        phoneNumber:number
    }
}

export const closeReqInfoModal = () =>{
    return{
        type:actionTypes.CLOSE_INFO_MODAL
    }
}

export const onSavePlasmaDonarReq = (id) =>{
    return{
     type:actionTypes.ON_SAVE_PLASMA_REQ,
     id:id,
     infoMessage:  labi.SUCCESS_MSG_REQ    
    }
 }
 
 export const startSavePlasmaReq = () =>{
    return{
     type:actionTypes.START_SAVE_PLASMA_REQ
    }
 }
 export const errorSavePlasmaReq = (error) =>{
    return{
     type:actionTypes.ERROR_SAVE_PLASMA_REQ,
     error:error
    }
 }
 export const onClickReqForm = () =>{
    return{
     type:actionTypes.ON_CLICK_REQUESTER_MODAL
    }
 }
 export const onCloseReqForm = () =>{
    return{
     type:actionTypes.ON_CLOSE_REQUESTER_MODAL
    }
 }
 
 export const fetchPlasmaReq = (filterData) =>{
    return dispatch =>{
        dispatch(startFetchPlasmaReq())
      

        const queries = plasmaRequestCollection;
          const lastMonthDate =  new Date(moment(new Date()).subtract(30,'days'));
        const arr = []
        arr.push(`queries.where('dataPrivacy','==',1)`)
        
        if(!(Object.keys(filterData).length === 0 && filterData.constructor === Object)){
            if(filterData.bloodGroup){
                arr.push(`where("bloodGroup","==",'${filterData.bloodGroup}')`);    
            }
            if(filterData.state){
                arr.push(`where("state","==",'${filterData.state}')`)    
            }
            if(filterData.districts){
                arr.push(`where("districts","==",'${filterData.districts}')`)    
    
            }
            if(filterData.pincode){
                arr.push(`where("pincode","==",${parseInt(filterData.pincode)})`)
            }
        }
        const query = arr.slice(0,arr.length).join('.')
        
      /*
        let query = plasmaRequestCollection;
       if(!(Object.keys(filterData).length === 0 && filterData.constructor === Object)){
            if(filterData.bloodGroup){
                query = query.where("bloodGroup","==",filterData.bloodGroup)    
       
            }
            if(filterData.state){
                query = query.where("state","==",filterData.state)    
            }
            if(filterData.districts){
                query = query.where("districts","==",filterData.districts)    
    
            }
            if(filterData.pincode){
                query = query.where("pincode","==",parseInt(filterData.pincode))    
            }
        }
        query = query.where('dataPrivacy', '==', 1); */
        eval(query).get()
        .then(snapShot =>{
            const details = firebaseLooper(snapShot);
            dispatch(onFetchPlasmaReq(details))
        })
        .catch(error=>{
            dispatch(errorFetchPlasmaReq(error))
    })
    }
}
export const onFetchPlasmaReq = (details) =>{
    return{
         type:actionTypes.ON_FETCH_PLASMA_REQ,
          plasmaReqDetails:details  
    }
}

export const startFetchPlasmaReq = () =>{
    return{
     type:actionTypes.START_FETCH_PLASMA_REQ
    }
 }
 export const errorFetchPlasmaReq = (error) =>{
    return{
     type:actionTypes.ERROR_FETCH_PLASMA_REQ,
     error:error
    }
 }