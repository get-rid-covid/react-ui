import firebase from '../../FirebaseDb/firebase'
import * as actionTypes from '../../utils/Constants/actionTypes'
export const initLogin = (user) =>{
    return dispatch =>{
        dispatch(startAuthProcess);
        firebase.auth().signInWithEmailAndPassword(user.email,user.password)
        .then(response =>{
            dispatch(authSuccess())
        }).catch(error =>{
            console.log(error.message)
            dispatch(authError(error.message));
        })
    }
}

export const initLogout = () =>{
    return dispatch =>{
        dispatch(startLogout());
        firebase.auth().signOut().then(res =>{
            dispatch(closeLoginModel());
        }).catch(error =>{
            dispatch(errorLogout(error))
        })
    }
}

export const startLogout = () =>{
    return {
        type: actionTypes.START_LOGOUT
    }
} 

export const errorLogout = (error) =>{
    return {
        type: actionTypes.ERROR_LOGOUT,
        message:error.message
    }
} 



export const startAuthProcess = () =>{
    return {
        type: actionTypes.START_AUTH
    }
} 

export const authSuccess = () =>{
    return {
        type: actionTypes.AUTH_SUCCESS
    }
}

export const authError = (message) =>{
    return {
        type: actionTypes.ERROR_AUTH,
        message:message
    }
}

export const closeInfoBox = () =>{
    return {
        type:actionTypes.ON_CLOSE_INFO_BOX
    }
}
export const openLoginModel = () =>{
    return {
        type:actionTypes.OPEN_LOGIN_MODEL
    }
}


export const closeLoginModel = () =>{
    return {
        type:actionTypes.CLOSE_LOGIN_MODEL
    }
}
