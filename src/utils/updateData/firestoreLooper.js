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