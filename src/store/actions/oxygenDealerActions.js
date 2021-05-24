import * as actionTypes from '../../utils/Constants/actionTypes';
import {oxygenDealerCollection,createdTime} from '../../FirebaseDb/firebase'
import {firebaseLooper} from '../../utils/updateData/updateState'
import moment from 'moment'
import * as labi from '../../utils/Constants/EnglishLabels'

export const initSaveOxygenDealer = (details)=>{
    return dispatch =>{
        dispatch(startSaveOxygen())
        oxygenDealerCollection.
        where('phoneNumber', '==',parseInt(details.phoneNumber))
        .get().then(snapShot =>{
            const dett = firebaseLooper(snapShot);
            if(dett.length===0){
                oxygenDealerCollection.add({
                        ...details,
                        age:parseInt(details.age),
                        dataPrivacy:parseInt(details.dataPrivacy),
                        pincode:parseInt(details.pincode),
                        oxygenCapacity:parseInt(details.oxygen_capacity),
                        phoneNumber: parseInt(details.phoneNumber),
                        createdTime:createdTime()
                    }).then(snapshot=>{
                        dispatch(onSaveOxygenDealer(snapshot.id))
                        dispatch(fetchDealerData({}));
                    }).catch(error =>{
                        dispatch(errorSaveOxygen(error))
                    }) 
            }
            else{
                dispatch(phoneNumExits(dett[0].phoneNumber))
            }   
        }).catch(err =>{
            dispatch(errorSaveOxygen(err))
        })
        
    }
}

export const onClickDealerForm = () =>{
    return{
     type:actionTypes.ON_CLICK_DEALER_MODAL
    }
 }

 export const onCloseDealerForm = () =>{
    return{
     type:actionTypes.ON_CLOSE_DEALER_MODAL
    }
 }

 export const startSaveOxygen = () =>{
    return{
     type:actionTypes.START_SAVE_OXYGEN
    }
 }

 export const phoneNumExits = (number) =>{
    return{
        type:actionTypes.PHONE_NUMBER_EXITS,
        phoneNumber:number
    }
}
export const onSaveOxygenDealer = (id) =>{
    return{
     type:actionTypes.ON_SAVE_OXYGEN,
     id:id,
     infoMessage: labi.SUCCESS_MSG
    }
 }

 export  const fetchDealerData = (filterData) =>{
    return dispatch =>{
        dispatch(startFetchOxygen())
      const queries = oxygenDealerCollection;
          const lastMonthDate =  new Date(moment(new Date()).subtract(30,'days'));
        const arr = []
        //where('postiveTestedDate', '>=',  ${new Date(lastMonthDate)})
        arr.push(`queries.where('dataPrivacy','==',1)`)
        
        if(!(Object.keys(filterData).length === 0 && filterData.constructor === Object)){
            
            if(filterData.state){
                arr.push(`where("state","==",'${filterData.state}')`)    
            }
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
            dispatch(onFetchDealerData(details))
        })
        .catch(error=>{
            dispatch(errorFetchOxygen(error))
    })
    } 
    

}

export const startFetchOxygen = () =>{
    return{
     type:actionTypes.START_FETCH_OXYGEN
    }
 }

 export const errorFetchOxygen = (error) =>{
    return{
     type:actionTypes.ERROR_FETCH_OXYGEN,
     error:error
    }
 }

 export const errorSaveOxygen = (error) =>{
    return{
     type:actionTypes.ERROR_SAVE_OXYGEN,
     error:error
    }
 }
 export const onFetchDealerData = (details) =>{
    return{
         type:actionTypes.ON_FETCH_OXYGEN,
          dealerDetails:details  
    }
}
export const onClickOxygenFilter = () =>{
    return{
        type:actionTypes.OPEN_OXYGEN_FILTER
    } 
 }
//CLOSE_FILTER
export const onCloseOxygenFilter = () =>{
    return{
        type:actionTypes.CLOSE_OXYGEN_FILTER
    } 
 }
 export const closeOxygenInfoModal = () =>{
    return{
        type:actionTypes.CLOSE_OXYGEN_INFO_MODAL
    }
}