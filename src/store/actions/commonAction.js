import * as actionTypes from '../../utils/Constants/actionTypes'

export const onClickOpenModal = (modalType) =>{
    return{
        type:actionTypes.OPEN_MODAL,
        modalType:modalType
    } 
}

export const onCloseModal = () =>{ 
    return{
        type:actionTypes.CLOSE_MODAL
       }
}

export const onClickInfoModal = (message) =>{
    return{
        type:actionTypes.OPEN_INFO_MODAL,
        message:message
    } 
}

export const onCloseInfoModal = () =>{ 
    return{
        type:actionTypes.CLOSE_INFO_MODAL
       }
}