import React,{Component} from 'react';
import * as labi from '../../utils/Constants/EnglishLabels'
import InputElement from '../../UI/Input/Input'
import classes from './authForm.module.css'
import * as BloodGroup from '../../utils/Constants/BloodGroup'
import {getCountryStateData,getDistrictsData} from '../../utils/updateData/stateDistrictModel'
import Button from '../../UI/Button/Button'
import * as orgAction from '../../store/actions/index'
import {connect} from 'react-redux'
import Aux from '../../hoc/Auxilary/Auxilary'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import {validator} from '../../utils/Validator/Validator'
import Model from '../../UI/Modal/Modal'
class AuthForm extends Component{
    state={
        authForm:{
            email:{
                elementType:'input',
                value:'',
                labelValue:labi.EMAIL,
                colSize:'col-md-12',
                elementConfig:{
                    placeholder:'Email'
                },
                validation: {
                    required:true,
                    isEmail:true
                },
                isValid:false,
                touched:false
            },
            password:{
                elementType:'password',
                value:'',
                labelValue:labi.PASSWORD,
                colSize:'col-md-12',
                elementConfig:{
                    placeholder:'Password'
                },
                validation: {
                    required:true,
                },
                isValid:false,
                touched:false
            }
            
        },
        canformSubmit : false
}

        
        changeHandler = (event,updatedKey) =>{
            const updatedForm = {...this.state.authForm};
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
                authForm : updatedForm,
                canformSubmit:formValid
            })
        
        }



        submitLogin = (event)=>{
            event.preventDefault();
            //console.log(this.mappingData(this.state.authForm))
            this.props.initLogin(this.mappingData(this.state.authForm))

        }
        
        mappingData = (data) =>{
            const details = {};
            for(let key in data){
                details[key] =  data[key].value
            }
            return details;
        }
        closeInfoModal = () =>{
            this.props.closeInfoBox();
        }    

    render(){
    let formDetails = [];
    const stateForm =  this.state.authForm;
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
        <div className={classes.headerClass}><strong> {labi.AUTHENTICATION} </strong> </div>
        <form>  
            <div className="form-row">
                    {formDetails}
            </div>
            <div className={classes.ButtonClass}>
                    <Button  btnType={(this.state.canformSubmit) ? "btn btn-success":"btn btn-secondary"} clicked={this.submitLogin} disabled={!(this.state.canformSubmit)}>Login</Button>
                    <Button  btnType='btn btn-danger' clicked={this.props.onCancel} >Cancel</Button>
            </div>
            
        </form>
    </div>

    )
}
}

const mapStatesToProps  = (state) =>{
    return{
        loading:state.authReducer.loading,
        infoModel:state.authReducer.infoModel,
        infoMessage:state.authReducer.infoMessage
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        initLogin : (details) => dispatch(orgAction.initLogin(details)),
        closeInfoBox : () =>dispatch(orgAction.closeInfoBox()),
        onCloseFilter : () => dispatch(orgAction.onCloseFilter()),
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(AuthForm);



