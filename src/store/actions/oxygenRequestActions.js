import * as actionTypes from '../../utils/Constants/actionTypes'
import {oxygenRequestCollection,createdTime} from '../../FirebaseDb/firebase'
import {firebaseLooper} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'
import moment from 'moment'


export const onClickOxygenReqForm = () =>{
    return{
     type:actionTypes.ON_CLICK_OXYGEN_REQUESTER_MODAL
    }
 }
 export const onCloseOxygenReqForm = () =>{
    return{
     type:actionTypes.ON_CLOSE_OXYGEN_REQUESTER_MODAL
    }
 }
 export const initSaveOxygenRequest = (details)=>{
    return dispatch =>{
        dispatch(startSaveOxygenReq())
        oxygenRequestCollection.where('phoneNumber', '==',parseInt(details.phoneNumber))
        .get().then(snapShot =>{
            const dett = firebaseLooper(snapShot);
            if(dett.length==0){
                oxygenRequestCollection.add({
                    ...details,
                    age:parseInt(details.age),
                    dataPrivacy:parseInt(details.dataPrivacy),
                    pincode:parseInt(details.pincode),
                    phoneNumber: parseInt(details.phoneNumber),
                    createdTime:createdTime()
                }).then(snapshot=>{
                    dispatch(onSaveOxygenDealerReq(snapshot.id));
                    dispatch(fetchOxygenReq({}))
                }).catch(error =>{
                    dispatch(errorSaveOxygenReq(error))
                })
            }
            else{
                dispatch(phoneNumExits(dett[0].phoneNumber))
            }   
        }).catch(err =>{
            dispatch(errorSaveOxygenReq(err))
        })
        
    }
}

export const startSaveOxygenReq = () =>{
    return{
     type:actionTypes.START_SAVE_OXYGEN_REQ
    }
 }
 
export const onSaveOxygenDealerReq = (id) =>{
    return{
     type:actionTypes.ON_SAVE_OXYGEN_REQ,
     id:id,
     infoMessage:  labi.SUCCESS_MSG_REQ    
    }
 }
 
 export const fetchOxygenReq = (filterData) =>{
    return dispatch =>{
        dispatch(startFetchOxygenReq())
      

        const queries = oxygenRequestCollection;
          const lastMonthDate =  new Date(moment(new Date()).subtract(30,'days'));
        const arr = []
        arr.push(`queries.where('dataPrivacy','==',1)`)
        
        if(!(Object.keys(filterData).length === 0 && filterData.constructor === Object)){
            
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
            dispatch(onFetchOxygenReq(details))
        })
        .catch(error=>{
            dispatch(errorFetchOxygenReq(error))
    })
    }
}

export const startFetchOxygenReq = () =>{
    return{
     type:actionTypes.START_FETCH_OXYGEN_REQ
    }
 }

 export const onFetchOxygenReq = (details) =>{
    return{
         type:actionTypes.ON_FETCH_OXYGEN_REQ,
          oxygenReqDetails:details  
    }
}
export const errorFetchOxygenReq = (error) =>{
    return{
     type:actionTypes.ERROR_FETCH_OXYGEN_REQ,
     error:error
    }
 }


 export const errorSaveOxygenReq = (error) =>{
    return{
     type:actionTypes.ERROR_SAVE_OXYGEN_REQ,
     error:error
    }
 }
 export const phoneNumExits = (number) =>{
    return{
        type:actionTypes.PHONE_NUMBER_EXITS,
        phoneNumber:number
    }
}
