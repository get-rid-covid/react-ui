import React,{Component} from 'react';

class SupplierBuilder extends Component{
    state={
        suppliers : [
            'Beds',
            'Oxygen Supply',
            'Online Doctors',
            'Nurses',
            'Home Isolation Setup'
        ],
        supplierForm : null,
        
    }

    componentDidMount(){
        this.state.suppliers().forEach(element => {
            const supForm = {...this.state.supplierForm};   
                supplierForm[element] ={
                    elementType: 'checkbox',
                    value: '',
                    labelValue:element,
                    colSize:'col-md-6',
                    touched:false,
                    isValid:true,
                    validation:{}
                }
                supplierForm[element +'_input']={
                elementType: 'input',
                value: '',
                labelValue:element,
                colSize:'col-md-2',
                touched:false,
                isValid:true,
                validation:{}
            }
            this.setState({
                supplierForm:supForm
            });
        });
    }

    changeHandler = (event,updatedKey) =>{
        const updatedForm = {...this.state.supplierForm};
        const updatedElement = {...updatedForm[updatedKey]}
        updatedElement.value = event.target.value;
        updatedElement.touched = true;
        updatedForm[updatedKey] = updatedElement;
        
        this.setState({
            supplierForm : updatedForm
        })
    
    }

    render(){

    let formDetails = [];
    const stateForm =  this.state.supplierForm;
    for(let key in stateForm){
        formDetails.push(
            <InputElement elementType={stateForm[key].elementType} 
            value={stateForm[key].value} 
            elementConfig={stateForm[key].elementConfig} 
            labelValue={stateForm[key].labelValue}
            change = {(event) => {this.changeHandler(event,key)} }
            colSize={stateForm[key].colSize}  
            isInvalid = {!stateForm[key].isValid}
            touched ={stateForm[key].touched}/>
        )
    }
        return (
            <div className={[classes.SupplierForm]}>
            <div className={classes.headerClass}><strong>requi</strong> </div>
            <form >  
                <div className="form-row">
                    {formDetails}
                </div>
                <Button btnType={"Primary"} clicked={this.submitIntialDetailsHandler}>Submit</Button>
            </form>
        </div>
            )
    }

    
}
