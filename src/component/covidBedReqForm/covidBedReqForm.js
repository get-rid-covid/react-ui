import React,{Component} from 'react';
import * as labi from '../../utils/Constants/EnglishLabels'
import InputElement from '../../UI/Input/Input'
import classes from './covidBedReqForm.module.css'
import  {validator} from '../../utils/Validator/Validator'
import Button from '../../UI/Button/Button'
import * as orgAction from '../../store/actions/index'
import {connect} from 'react-redux'
import Model from '../../UI/Modal/Modal'
import TermsNConditon from '../TermsNCondition/TermsCondition'
import * as BloodGroup from '../../utils/Constants/BloodGroup'
import * as BedTypes from '../../utils/Constants/CovidBedTypes'

import * as placeData  from '../../utils/updateData/stateDistrictModel'
import { updateState } from '../../utils/updateData/updateState';

class CovidBedReqForm extends Component{

state = {
    covidBedForm:{
        orgName:{
            elementType:'input',
            value:'',
            labelValue:labi.PAT_NAME,
            colSize:'col-md-12',
            elementConfig:{
                placeholder:'Full Name'
            },
            validation: {
                required:true,
            },
            isValid:false,
            touched:false
        },
        contactName:{
            elementType:'input',
            value:'',
            labelValue:labi.CONT_NAME,
            colSize:'col-md-12',
            elementConfig:{
                placeholder:'Contact Name'
            },
            validation: {
                required:false,
            },
            isValid:true,
            touched:false
        },
        age:{
            elementType:'input',
            value:'',
            labelValue:labi.AGE,
            colSize:'col-md-6',
            elementConfig:{
                placeholder:'Age'
            },
            validation: {
                pattern:'^(0|[1-9][0-9]*)$',
                maxLength:2,
                minLength:2
            },
            isValid:true,
            touched:false
        },
        phoneNumber:{
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
                minLength:10

            },
            isValid:false,
            touched:false
        },
        covidBedType:{
            elementType: 'select',
            value: '',
            labelValue:labi.Covid_BED_TYPE,
            colSize:'col-md-6',
            
            elementConfig: {
            options:  [{ value: 'e', displayName: 'e' }]
            },
            touched:true,
            isValid:true,
            validation:{
                required:true
            }
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
            touched:true,
            isValid:true,
            validation:{
                required:true
            }
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
            isValid:false,
            validation:{
                required:true
            }
        },
        address:{
            elementType:'input',
            value:'',
            labelValue:labi.ADDRESS,
            colSize:'col-md-12',
            elementConfig:{
                placeholder:'Address'
            },
            validation: {},
            isValid:true,
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
                required:true,
                pattern:'^(0|[1-9][0-9]*)$',
                maxLength:6,
                minLength:6
            },
            isValid:false,
            touched:false
        },
        dataPrivacy:{
            elementType: 'select',
            value: '',
            labelValue:labi.DATA_PRIVACY,
            colSize:'col-md-6',
            elementConfig: {
            options: [{ value: '', displayName: '-' },
                     { value: 1, displayName: labi.YES_DATA_PRIVACY },
                     { value : 0, displayName: labi.NO_DATA_PRIVACY}   
                    ]
            },
            touched:false,
            isValid:false,
            validation:{
                required:true
            }
        }
        
    },
    isTermCondition : false,
    doOpenTNCModel : false,
    canformSubmit : false
}
componentDidMount() {

    const supForm = {...this.state.covidBedForm};   
    const covidBedType = {...supForm.covidBedType};
    covidBedType.elementConfig.options=BedTypes.COVID_BED_COMBO;
    supForm.covidBedType=covidBedType;
    const stateDetails = {...supForm.state}
    const elementConfig  = {...stateDetails.elementConfig}
    elementConfig.options = placeData.getCountryStateData();
    stateDetails.value = placeData.DEFAULT_STATE;
    this.changeDistrict(stateDetails); 
    stateDetails.elementConfig =elementConfig;
    supForm.state = stateDetails;

    this.setState({
        covidBedForm:supForm    
    })
}


changeDistrict = (element) =>{
    const districtList =  placeData.getDistrictsData(element.value);
    const updatedForm = {...this.state.covidBedForm};
    const disElement = {...updatedForm.districts}
    disElement.elementConfig.options = districtList;
    updatedForm.districts = disElement;
    this.setState({
        covidBedForm:updatedForm
    })
}

changeHandler = (event,updatedKey) =>{
    const updatedForm = {...this.state.covidBedForm};
    const updatedElement = {...updatedForm[updatedKey]}
    if(updatedElement.elementType==='checkbox'){
        updatedElement.value= event.target.checked
    }
    else{
        updatedElement.value = event.target.value;
    }
    updatedElement.touched = true;
    updatedElement.isValid = validator(updatedElement.value,updatedElement.validation);
    if(updatedElement.onChangeEvent){
        this[updatedElement.onChangeEvent](updatedElement);
    }
    updatedForm[updatedKey] = updatedElement;
    let formValid= true;
    for(let keys in updatedForm){
        formValid = updatedForm[keys].isValid && formValid ;
    }
    this.setState({
        covidBedForm : updatedForm,
        canformSubmit:formValid
    })

}
onSelectTermCondition = (event) =>{
        this.setState(prevState =>
            {
             return {
                isTermCondition : !prevState.isTermCondition
            }
        })
}
openTNCModel = (event) =>{
    this.setState(prevState =>
        {
        return {
            doOpenTNCModel : !prevState.doOpenTNCModel
        }
    })
}
closeInfoModal = () =>{
    this.props.closeInfoModal();
}

submitIntialDetailsHandler = (event) =>{
    event.preventDefault();
    const details = this.mappingData(this.state.covidBedForm);
    console.log(details)
    this.props.initCovidBedSaveReq(details);
}
mappingData = (data) =>{
    const details = {};
    for(let key in data){
        details[key] =  data[key].value
    }
    return details;

}

render() {
    let formDetails = [];
    const stateForm =  this.state.covidBedForm;
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
            id= {stateForm[key].id ? stateForm[key].id: null}
            isRequired = {stateForm[key].validation.required ? stateForm[key].validation.required: false}/>
        )
    }
    return(
        <div className={classes.PlasmaDonars}>
            <Model show={this.props.infoModel} giveFormHeight={false} >
                <p>{this.props.infoMessage}</p>
                <div className={classes.ButtonClass}>
                    <Button btnType="btn btn-primary" clicked={this.closeInfoModal} > Ok</Button>
                </div>
            </Model>
            <Model show={this.state.doOpenTNCModel} giveFormHeight={false} >
                <TermsNConditon/>
                <div className={classes.ButtonClass}>
                    <Button btnType="btn btn-primary" clicked={this.openTNCModel} > Ok</Button>
                </div>
            </Model>
        <div className={classes.headerClass}><strong> {labi.Covid_BEDS_ENTRY} </strong> </div>
        <form >  
            <div className="form-row">
                {formDetails}
            </div>
        
        <div className="form-check form-check-inline">
                <input type='checkbox'  className='form-check-input' id='termsCondition' value={this.state.isTermCondition} onChange ={this.onSelectTermCondition}/>
                <label className= "form-check-label" htmlFor='termsCondition'>
                    agree to <strong style={{display:'inline'}} onClick={this.openTNCModel}> Terms and Condition</strong>
            
                </label>
        </div>
    
        
            <div className={classes.ButtonClass}>
                <Button  btnType={(this.state.canformSubmit && this.state.isTermCondition) ? "btn btn-success":"btn btn-secondary"} clicked={this.submitIntialDetailsHandler} disabled={!(this.state.canformSubmit && this.state.isTermCondition)}>Submit</Button>
                <Button  btnType='btn btn-danger' clicked={this.props.onCancel} >Cancel</Button>
            </div>
            
        </form>
        </div>

    )
}


}

const mapStatesToProps  = (state) =>{
    return{
        loading:state.plasmaDonarReducer.loading,
        infoModel:state.plasmaDonarReducer.infoModel,
        infoMessage:state.plasmaDonarReducer.infoMessage
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        initCovidBedSaveReq : (details) => dispatch(orgAction.initCovidRequests(details)),
        getAllDonarDetails : () => dispatch( orgAction.fetchDonarData({})),
        closeInfoModal : () => dispatch( orgAction.closeInfoModal())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(CovidBedReqForm);