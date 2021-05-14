 import countryStates from '../JSON_DATA/States_District.json'
export const DEFAULT_STATE = 'Telangana'
export const getCountryStateData = () =>{
    return countryStates.states.map(e =>{
        return { value: e.state, displayName: e.state }
    })
}
export const findState = (name) =>{
    return  countryStates.states.find(e => e.state===name);
    
}
export const getDistrictsData = (stateName) =>{
    return findState(stateName).districts.map(e =>{
        return { value: e, displayName: e }
    })
}

export const setDefaultState = () =>{
    return findState(DEFAULT_STATE);
}

export const setDefaultStateDistricts = () =>{
    return getDistrictsData(DEFAULT_STATE);
}