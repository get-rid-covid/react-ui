import React,{Component} from 'react';
import * as labi from '../../utils/Constants/EnglishLabels'
import InputElement from '../../UI/Input/Input'
import countryStates from '../../utils/JSON_DATA/States_District.json'
import classes from './UserDetailsForm.module.css'
import  {validator} from '../../utils/Validator/Validator'
import Button from '../../UI/Button/Button'
import * as orgAction from '../../store/actions/index'
import {connect} from 'react-redux'

class UserForm extends Component{

state = {
    suppliers : [
        'Beds',
        'Oxygen Supply',
        'Online Doctors',
        'Nurses',
        'Home Isolation Setup'
    ],
    userDetailForm:{
        organisation_name:{
            elementType:'input',
            value:'',
            labelValue:labi.ORG_NAME,
            colSize:'col-md-12',
            elementConfig:{
                placeholder:'Organisation Name'
            },
            validation: {
                required:true,
            },
            isValid:false,
            touched:false
        },
        isHospital:{
            elementType:'checkbox',
            value:'col-md-3',
            labelValue:labi.IS_HOSPITAL,
            id:labi.IS_HOSPITAL,
            colSize:'',
            elementConfig:{
                placeholder:'is Hospital'
            },
            validation: {},
            isValid:false,
            touched:false
        },
        contact_name:{
            elementType:'input',
            value:'',
            labelValue:labi.Contact_NAME,
            colSize:'col-md-12',
            elementConfig:{
                placeholder:'Contact Name'
            },
            validation: {
                required:true
            },
            isValid:false,
            touched:false
        },
        
        phoneNum:{
            elementType:'input',
            value:'',
            labelValue:labi.PHONE_NUMBER,
            colSize:'col-md-6',
            elementConfig:{
                placeholder:'Phone Number'
            },
            validation: {
                required:true,
                pattern:'^(0|[1-9][0-9]*)$',
                maxLength:10,
                minLenght:10

            },
            isValid:false,
            touched:false
        },
        emg_phoneNum:{
            elementType:'input',
            value:'',
            labelValue:labi.ALT_PHONENUM,
            colSize:'col-md-6',
            elementConfig:{
                placeholder:'Alternative Phone Number'
            },
            validation: {
                required:true
            },
            isValid:false,
            touched:false
        },

        state:{
            elementType: 'select',
            value: '',
            labelValue:labi.STATE_NAME,
            colSize:'col-md-6',
            
            elementConfig: {
            options:  [{ value: 'e', displayName: 'e' }]
            },
            onChangeEvent : 'changeDistrict',
            touched:false,
            isValid:true,
            validation:{}
        },

        districts:{
            elementType: 'select',
            value: '',
            labelValue:labi.DISTRICTS,
            colSize:'col-md-6',
            elementConfig: {
            options: [{ value: 'e', displayName: 'e' }]
            },
            touched:false,
            isValid:true,
            validation:{}
        },
        address:{
            elementType:'input',
            value:'',
            labelValue:labi.ADDRESS,
            colSize:'col-md-12',
            elementConfig:{
                placeholder:'Address'
            },
            validation: {
                required:true
            },
            isValid:false,
            touched:false
        },
        email:{
            elementType:'input',
            value:'',
            labelValue:labi.EMAIL,
            colSize:'col-md-6',
            elementConfig:{
                placeholder:'Email'
            },
            validation: {
                required:true
            },
            isValid:false,
            touched:false
        },
        pincode:{
            elementType:'input',
            value:'',
            labelValue:labi.PINCODE,
            colSize:'col-md-6',
            elementConfig:{
                placeholder:'Pincode'
            },
            validation: {
                required:true
            },
            isValid:false,
            touched:false
        },

    }
}
componentDidMount() {

    const supForm = {...this.state.userDetailForm};   
    supForm.availabilty_labelpincode = {
        elementType:'main_label',
        value:'',
        labelValue:labi.AVAIL_LABEL,
        colSize:'col-md-12',
    }
    this.state.suppliers.forEach(element => {
        
        supForm[element] ={
                elementType: 'checkbox',
                value: '',
                labelValue:element,
                id:element,
                colSize:'col-md-6 col-xs-6 col-sm-6',
                touched:false,
                isValid:true,
                validation:{}
            }
        supForm[element+'_stock'] ={
                elementType: 'checkbox',
                value: '',
                id: element+'_stock',
                labelValue:labi.STOCK,
                colSize:'col-md-6 col-xs-6 col-sm-6',
                touched:false,
                isValid:true,
                validation:{}
        }    
    });
         
    const stateDetails = {...supForm.state}
    const elementConfig  = {...stateDetails.elementConfig}
    elementConfig.options = this.getCountryStateData();
    stateDetails.elementConfig =elementConfig;
    supForm.state = stateDetails;

    this.setState({
        userDetailForm:supForm    
    })
}

getCountryStateData = () =>{
    return countryStates.states.map(e =>{
        return { value: e.state, displayName: e.state }
    })
}
getStateDistrictObj = (name) =>{
    return  countryStates.states.find(e => e.state===name);
    
}
getDistrictsData = (stateName) =>{
    return this.getStateDistrictObj(stateName).districts.map(e =>{
        return { value: e, displayName: e }
    })
}
changeDistrict = (element) =>{
    const districtList =  this.getDistrictsData(element.value);
    const updatedForm = {...this.state.userDetailForm};
    const disElement = {...updatedForm.districts}
    disElement.elementConfig.options = districtList;
    updatedForm.districts = disElement;
    this.setState({
        userDetailForm:updatedForm
    })
}

checkValidity = (value, rules) =>{
    return ()=>validator.validator;
}
changeHandler = (event,updatedKey) =>{
    const updatedForm = {...this.state.userDetailForm};
    const updatedElement = {...updatedForm[updatedKey]}
    updatedElement.value = event.target.value;
    updatedElement.touched = true;
    updatedElement.isValid = validator(updatedElement.value,updatedElement.validation);
    if(updatedElement.onChangeEvent){
        this[updatedElement.onChangeEvent](updatedElement);
    }
    updatedForm[updatedKey] = updatedElement;
    
    this.setState({
        userDetailForm : updatedForm
    })

}

submitIntialDetailsHandler = (event) =>{
    event.preventDefault();
    const details = this.mappingData(this.state.userDetailForm);
    this.props.onSubmitOrgDetails(details);
}
mappingData = (data) =>{
    const details = {};
    for(let key in data){
        details[key] =  key.value
    }
    return details;

}

render() {
    let formDetails = [];
    const stateForm =  this.state.userDetailForm;
    for(let key in stateForm){
        formDetails.push(
            <InputElement 
            key ={key}
            elementType={stateForm[key].elementType} 
            value={stateForm[key].value} 
            elementConfig={stateForm[key].elementConfig} 
            labelValue={stateForm[key].labelValue}
            change = {(event) => {this.changeHandler(event,key)} }
            colSize={stateForm[key].colSize}  
            isInvalid = {!stateForm[key].isValid}
            touched ={stateForm[key].touched}
            id= {stateForm[key].id ? stateForm[key].id: null}/>
        )
    }
    return(
        <div className={classes.UserForm}>
            <div className={classes.headerClass}><strong> {labi.USER_DETAILS} </strong> </div>
        <form >  
            <div className="form-row">
                {formDetails}
            </div>
            <div className={classes.ButtonClass}>
                <Button  btnType="btn btn-success" clicked={this.submitIntialDetailsHandler}>Submit</Button>
            </div>
            
        </form>
        </div>

    )
}


}

const mapStatesToProps  = (state) =>{
    return{
        orgDetails:state.orgReducer.orgDetails
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        onSubmitOrgDetails : (details) => dispatch(orgAction.initOnSaveOrgDetails(details))
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(UserForm);