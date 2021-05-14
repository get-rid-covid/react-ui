export const updateState =  (state,updatedState) =>{
    return {
        ...state,
        ...updatedState
    }
}


export const firebaseLooper  = (snapshot) =>{
    let data = [];
    snapshot.forEach(docs =>{

        data.push( {
            ...docs.data(),
            id:docs.id
        })

    })

    return data;
}


export const timestampConvertion = (dateObj) =>{
    return new Date(dateObj.seconds * 1000).toLocaleDateString("en-US");
}

export const sendToDonarWhatsapp = (data) => {
    const message = 'Hi ' +data.donarName +' I have recieved your contact from Get-rid-covid.com, We urgently need ' +data.bloodGroup +' blood plasma. Please Help us out !!!'
    //return 'https://wa.me/'+data.phoneNumber+'/?text='+encodeURI(message);
    return 'https://wa.me/'+data.phoneNumber+'/?text='+encodeURI(message);
}

export const sendToReqWhatsapp = (data) => {
    const message = 'Hi ' +data.contactName +' I have recieved your contact from Get-rid-covid.com, I have seen your request and I am here to help you out.'
    //return 'https://wa.me/'+data.phoneNumber+'/?text='+encodeURI(message);
    return 'https://wa.me/'+data.phoneNumber+'/?text='+encodeURI(message);
}


