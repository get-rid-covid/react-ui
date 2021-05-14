import React,{Component} from 'react';
import * as labi from '../../utils/Constants/EnglishLabels'
import InputElement from '../../UI/Input/Input'
import classes from './feedback.module.css'
import  {validator} from '../../utils/Validator/Validator'
import Button from '../../UI/Button/Button'
import * as orgAction from '../../store/actions/index'
import {connect} from 'react-redux'
import Model from '../../UI/Modal/Modal'

class feedback extends Component{

state = {
    requestForm:{
        name:{
            elementType:'input',
            value:'',
            labelValue:labi.NAME,
            colSize:'col-md-6',
            elementConfig:{
                placeholder:'Name'
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
        feedBack:{
            elementType:'textarea',
            value:'',
            labelValue:labi.FEEDBACK,
            colSize:'col-md-12',
            elementConfig:{
                placeholder:'Feedback'
            },
            validation: {
                required:true
            },
            isValid:false,
            touched:false
        }
    },
    isTermCondition : false,
    doOpenTNCModel : false,
    canformSubmit : false
}


changeHandler = (event,updatedKey) =>{
    const updatedForm = {...this.state.requestForm};
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
        formValid = updatedForm[keys].isValid && formValid;
    }
    this.setState({
        requestForm : updatedForm,
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
onSubmitFeedback = (event) =>{
    event.preventDefault();
    const details = this.mappingData(this.state.requestForm);
    this.props.onSubmitFeedback(details);

}
mappingData = (data) =>{
    const details = {};
    for(let key in data){
        details[key] =  data[key].value
    }
    return details;

}

clearAll = () =>{
    const form = {...this.state.requestForm}
    for(let key in form){
        const element = {...form[key]}
        element.value= '';
        form[key] = element
    }
    this.setState({
        requestForm:form
    })
}
closeSuccess = () =>{
    this.clearAll();
    this.props.onCloseSuccessMessage();
}
render() {
    let formDetails = [];
    const stateForm =  this.state.requestForm;
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
        <div className={classes.Feedback}>
            <Model show={this.props.isSuccess}  giveFormHeight={false}>
                <p> Successfully saved !!!</p>
                <div className={classes.ButtonClass}>
                    <Button btnType="btn btn-primary" clicked={this.closeSuccess} > Ok</Button>
                </div>
            </Model>
        <div className={classes.headerClass}><strong> {labi.FEEDBACK} </strong> </div>
        <form >  
            <div className="form-row">
                {formDetails}
            </div>
            <div className={classes.ButtonClass}>
                <Button  btnType={this.state.canformSubmit ? "btn btn-success":"btn btn-secondary"} clicked={this.onSubmitFeedback} disabled={!this.state.canformSubmit}>Submit</Button>
            </div>
            
        </form>
        </div>

    )
}


}

const mapStatesToProps  = (state) =>{
    return{
        loading:state.feedbackReducer.loading,
        isSuccess: state.feedbackReducer.isSuccessful
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        onSubmitFeedback : (details) => dispatch(orgAction.initFeedBackSave(details)),
        onCloseSuccessMessage : () => dispatch(orgAction.onClickCloseFeedBack())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(feedback);