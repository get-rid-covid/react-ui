import {oxygenDealerCollection,createdTime} from '../../FirebaseDb/firebase';
import * as actionTypes from '../../utils/Constants/actionTypes'
import * as labi from '../../utils/Constants/EnglishLabels'
import moment from 'moment'
import {firebaseLooper} from '../../utils/updateData/updateState'

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
                        oxygen_concentrators:parseInt(details.oxygenConcentrators),
                        pincode:parseInt(details.pincode),
                        phoneNumber: parseInt(details.phoneNumber),
                        createdTime:createdTime()
                    }).then(snapshot=>{
                        dispatch(onSaveOxygenDealer(snapshot.id))
                        dispatch(fetchDealerData({}));
                    }).catch(error =>{
                        dispatch(errorSaveDealer(error))
                    }) 
            }
            else{
                dispatch(phoneNumExits(dett[0].phoneNumber))
            }   
        }).catch(err =>{
            dispatch(errorSavePlasma(err))
        })
        
    }
}

export const phoneNumExits = (number) =>{
    return{
        type:actionTypes.PHONE_NUMBER_EXITS,
        phoneNumber:number
    }
}

export const closeInfoModal = () =>{
    return{
        type:actionTypes.CLOSE_INFO_MODAL
    }
}

export const onSaveOxygenDealer = (id) =>{
    return{
     type:actionTypes.ON_SAVE_OXYGEN,
     id:id,
     infoMessage: labi.SUCCESS_MSG
    }
 }

 export const onClickFilter = () =>{
    return{
        type:actionTypes.OPEN_FILTER
    } 
 }
//CLOSE_FILTER
export const onCloseFilter = () =>{
    return{
        type:actionTypes.CLOSE_FILTER
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
 export const errorSaveOxygen = (error) =>{
    return{
     type:actionTypes.ERROR_SAVE_OXYGEN,
     error:error
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

export const onFetchDealerData = (details) =>{
    return{
         type:actionTypes.ON_FETCH_OXYGEN,
          donarDetails:details  
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