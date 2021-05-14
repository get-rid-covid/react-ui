import moment from 'moment';

export const validator =(value,rules)=>{
    let  isValid = true;
    if(!rules){
        return true;
    }
    if(rules.required){
         isValid = value.trim() !=='' && isValid;
     }
     if(rules.minLength){
         isValid = value.length >=rules.minLength && isValid;
     }
     if(rules.maxLength){
        isValid = value.length <=rules.maxLength && isValid;
    }
    if(rules.isDate){
        isValid = moment(value).isValid && isValid;
        isValid = moment(new Date()).isAfter(value) && isValid;
    }
    if(rules.pattern){
        const patt = new RegExp(rules.pattern)
        isValid = patt.test(value) && isValid;
    }
    return isValid;
}


