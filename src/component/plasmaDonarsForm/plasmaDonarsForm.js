import React,{Component} from 'react';
import * as labi from '../../utils/Constants/EnglishLabels'
import InputElement from '../../UI/Input/Input'
import classes from './plasmaDonarsForm.module.css'
import  {validator} from '../../utils/Validator/Validator'
import Button from '../../UI/Button/Button'
import * as orgAction from '../../store/actions/index'
import {connect} from 'react-redux'
import Model from '../../UI/Modal/Modal'
import TermsNConditon from '../TermsNCondition/TermsCondition'
import * as BloodGroup from '../../utils/Constants/BloodGroup'
import * as placeData  from '../../utils/updateData/stateDistrictModel'

class PlasmaDonarsRegForm extends Component{

state = {
    userDetailForm:{
        donarName:{
            elementType:'input',
            value:'',
            labelValue:labi.NAME,
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
        bloodGroup:{
            elementType: 'select',
            value: '',
            labelValue:labi.BLOOD_GROUP,
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
        postiveTestedDate:{
            elementType: 'date',
            value: '',
            labelValue:labi.TEST_POS_DATE,
            colSize:'col-md-6',
            elementConfig: {
            options: [{ value: 'e', displayName: 'e' }]
            },
            touched:false,
            isValid:false,
            validation:{
                required:true,
                isDate:true
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
        },
        isDonatedPrevious:{
            elementType: 'select',
            value: '',
            labelValue:labi.DONATED_PREVIOUS,
            colSize:'col-md-6',
            elementConfig: {
            options: [{ value: '', displayName: '-' },
                     { value : 1, displayName: 'No'},
                     { value: 0, displayName: 'Yes' }   
                    ]
            },
            touched:false,
            isValid:true,
            validation:{}
        },
        
    },
    isTermCondition : false,
    doOpenTNCModel : false,
    canformSubmit : false
}
componentDidMount() {

    const supForm = {...this.state.userDetailForm};   
    const bgDetails = {...supForm.bloodGroup};
    bgDetails.elementConfig.options=BloodGroup.BLOOD_GROUP_COMBO;
    supForm.bloodGroup = bgDetails;
    const stateDetails = {...supForm.state}
    const elementConfig  = {...stateDetails.elementConfig}
    elementConfig.options = placeData.getCountryStateData();
    stateDetails.value = placeData.DEFAULT_STATE;
    this.changeDistrict(stateDetails); 
    stateDetails.elementConfig =elementConfig;
    supForm.state = stateDetails;

    this.setState({
        userDetailForm:supForm    
    })
}


changeDistrict = (element) =>{
    const districtList =  placeData.getDistrictsData(element.value);
    const updatedForm = {...this.state.userDetailForm};
    const disElement = {...updatedForm.districts}
    disElement.elementConfig.options = districtList;
    updatedForm.districts = disElement;
    this.setState({
        userDetailForm:updatedForm
    })
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
    let formValid= true;
    for(let keys in updatedForm){
        formValid = updatedForm[keys].isValid && formValid ;
    }
    this.setState({
        userDetailForm : updatedForm,
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
    const details = this.mappingData(this.state.userDetailForm);
    this.props.onSubmitDonarsDetails(details);
}
mappingData = (data) =>{
    const details = {};
    for(let key in data){
        details[key] =  data[
            key].value
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
        <div className={classes.headerClass}><strong> {labi.PlASMA_DONAR_HEADER} </strong> </div>
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
        onSubmitDonarsDetails : (details) => dispatch(orgAction.initSavePlasmaDonar(details)),
        getAllDonarDetails : () => dispatch( orgAction.fetchDonarData({})),
        closeInfoModal : () => dispatch( orgAction.closeInfoModal())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(PlasmaDonarsRegForm);