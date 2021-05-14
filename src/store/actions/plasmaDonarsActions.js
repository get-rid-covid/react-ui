import * as actionTypes from '../../utils/Constants/actionTypes'
import {plasmaDonarCollection,createdTime} from '../../FirebaseDb/firebase'
import {firebaseLooper} from '../../utils/updateData/updateState'
import * as labi from '../../utils/Constants/EnglishLabels'
import moment from 'moment'

export const initSavePlasmaDonar = (details)=>{
    return dispatch =>{
        dispatch(startSavePlasma())
        plasmaDonarCollection.
        where('phoneNumber', '==',parseInt(details.phoneNumber))
        .get().then(snapShot =>{
            const dett = firebaseLooper(snapShot);
            if(dett.length===0){
                    plasmaDonarCollection.add({
                        ...details,
                        age:parseInt(details.age),
                        dataPrivacy:parseInt(details.dataPrivacy),
                        isDonatedPrevious:parseInt(details.isDonatedPrevious),
                        pincode:parseInt(details.pincode),
                        postiveTestedDate: new Date(details.postiveTestedDate),
                        phoneNumber: parseInt(details.phoneNumber),
                        createdTime:createdTime()
                    }).then(snapshot=>{
                        dispatch(onSavePlasmaDonar(snapshot.id))
                        dispatch(fetchDonarData({}));
                    }).catch(error =>{
                        dispatch(errorSavePlasma(error))
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

export const onSavePlasmaDonar = (id) =>{
    return{
     type:actionTypes.ON_SAVE_PLASMA,
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
 export const onClickDonarForm = () =>{
    return{
     type:actionTypes.ON_CLICK_DONAR_MODAL
    }
 }
 export const onCloseDonarForm = () =>{
    return{
     type:actionTypes.ON_CLOSE_DONAR_MODAL
    }
 }

 export const startSavePlasma = () =>{
    return{
     type:actionTypes.START_SAVE_PLASMA
    }
 }
 export const errorSavePlasma = (error) =>{
    return{
     type:actionTypes.ERROR_SAVE_PLASMA,
     error:error
    }
 }



 
 export  const fetchDonarData = (filterData) =>{
    return dispatch =>{
        dispatch(startFetchPlasma())
      const queries = plasmaDonarCollection;
          const lastMonthDate =  new Date(moment(new Date()).subtract(30,'days'));
        const arr = []
        //where('postiveTestedDate', '>=',  ${new Date(lastMonthDate)})
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
            dispatch(onFetchDonarData(details))
        })
        .catch(error=>{
            dispatch(errorFetchPlasma(error))
    })
    } 
    

}

export const onFetchDonarData = (details) =>{
    return{
         type:actionTypes.ON_FETCH_PLASMA,
          donarDetails:details  
    }
}

export const startFetchPlasma = () =>{
    return{
     type:actionTypes.START_FETCH_PLASMA
    }
 }
 export const errorFetchPlasma = (error) =>{
    return{
     type:actionTypes.ERROR_FETCH_PLASMA,
     error:error
    }
 }

