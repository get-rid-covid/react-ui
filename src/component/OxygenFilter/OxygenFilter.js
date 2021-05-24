import React,{Component} from 'react';
import * as labi from '../../utils/Constants/EnglishLabels'
import InputElement from '../../UI/Input/Input'
import classes from './OxygenFilter.module.css'
import * as BloodGroup from '../../utils/Constants/BloodGroup'
import {getCountryStateData,getDistrictsData} from '../../utils/updateData/stateDistrictModel'
import Button from '../../UI/Button/Button'
import * as orgAction from '../../store/actions/index'
import {connect} from 'react-redux'
import Aux from '../../hoc/Auxilary/Auxilary'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


class OxygenFilter extends Component{
    state={
        filterForm:{
 
            phoneNumber:{
                elementType:'input',
                value:'',
                labelValue:labi.PHONE_NUMBER,
                colSize:'col-md-6',
                elementConfig:{
                    placeholder:'Phone Number'
                },
                validation: {
                },
                isValid:false,
                touched:false
            },
            state:{
                elementType: 'select',
                value: '',
                labelValue:labi.STATE_NAME,
                colSize:'col-md-6 col-sm-12 col-xs-12 col-12',
                elementConfig: {
                    options:  [{ value: 'e', displayName: 'e' }]
                },
                onChangeEvent : 'changeDistrict',
                touched:false,
                isValid:false,
                validation:{
                    required:true
                }
            },
    
            districts:{
                elementType: 'select',
                value: '',
                labelValue:labi.DISTRICTS,
                colSize:'col-md-6 col-sm-12 col-xs-12 col-12',
                elementConfig: {
                options: [{ value: 'e', displayName: 'e' }]
                },
                touched:false,
                isValid:false,
                validation:{
                    required:true
                }
            },
            pincode:{
                elementType:'input',
                value:'',
                labelValue:labi.PINCODE,
                colSize:'col-md-6 col-sm-12 col-xs-12 col-12',
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
            }
            
            },
            isFilterOn : true
            
        }

        componentDidMount() {

            const supForm = {...this.state.filterForm};   
            const stateDetails = {...supForm.state}
            const elementConfig  = {...stateDetails.elementConfig}
            elementConfig.options = getCountryStateData();
            stateDetails.elementConfig =elementConfig;
            supForm.state = stateDetails;
        
            this.setState({
                filterForm:supForm    
            })

        }
        
        changeDistrict = (element) =>{
            const districtList =  getDistrictsData(element.value);
            const updatedForm = {...this.state.filterForm};
            const disElement = {...updatedForm.districts}
            disElement.elementConfig.options = districtList;
            updatedForm.districts = disElement;
            this.setState({
                filterForm:updatedForm
            })
        }
        
        changeHandler = (event,updatedKey) =>{
            const updatedForm = {...this.state.filterForm};
            const updatedElement = {...updatedForm[updatedKey]}
            updatedElement.value = event.target.value;
            if(updatedElement.onChangeEvent){
                this[updatedElement.onChangeEvent](updatedElement);
            }
            updatedForm[updatedKey] = updatedElement;
            this.setState({
                filterForm : updatedForm,
            })
        }
        submitFilter = (event)=>{
            event.preventDefault();

            const data = this.mappingData(this.state.filterForm);
                if(this.props.isDealer){
                    this.props.onSubmitOxygenFilter(data);
                }
                else{
                    this.props.onSubmitOxygenReq(data);
                }
                this.props.onCloseFilter();
           }
        mappingData = (data) =>{
            const details = {};
            for(let key in data){
                details[key] =  data[key].value
            }
            return details;
        
        }
        toggleDealerHandler = () =>{
            this.setState( prevState =>{
                return {
                    isFilterOn : !prevState.isFilterOn
                }
            })
        }

    render(){
    let formDetails = [];
    const stateForm =  this.state.filterForm;
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
            id= {stateForm[key].id ? stateForm[key].id: null}
            />
        )
    }
    let form = null;
    if(this.state.isFilterOn){
       form =(
       <Aux>
        <div className={classes.PlasmaFilter}> 
            
            <form >  
                <div className={classes.formClass}>
                {/* <div class="col-md-2"  ></div> */}
                    {formDetails}
                    <div>
                        <Button  btnType= "btn btn-success"  clicked={this.submitFilter} >Filter</Button>
                        <Button  btnType='btn btn-danger' clicked={this.props.onCancel} >Cancel</Button>
                    </div>
                 <div className="col-md-2"  ></div>   

                </div>
            </form>
        </div>
       </Aux>
       );
    }
        return(
        <Aux>
            <div className={classes.headerClass}>
                <strong> {labi.FILTER} </strong>
            </div>  
            {form}
        </Aux>
            
        )
    }
}

const mapStatesToProps  = (state) =>{
    return{
        loading:state.oxygenDetailReducer.loading,
        donarList:state.oxygenDetailReducer.dealerList
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        onSubmitOxygenFilter : (details) => dispatch(orgAction.fetchDealerData(details)),
        onSubmitOxygenReq : (details) =>dispatch(orgAction.fetchOxygenReq(details)),
        onCloseOxygenFilter : () => dispatch(orgAction.onCloseOxygenFilter()),
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(OxygenFilter);
