import React from 'react';
import classes from './Input.module.css'
const Input = (props) =>{

let inputElement = null;
let inputClass =     ['form-control', classes.inputElement]
let sizeClass = ["form-group"];
if(props.isInvalid && props.touched){
    inputClass.push('is-invalid');
}

if(props.colSize){
    sizeClass.push(props.colSize);
}
    switch(props.elementType){
        case ('input'):
            inputElement = (<>
            <label>{props.labelValue} {props.isRequired ? <strong style={{color:'red'}}>*</strong>:null}</label>
            <input type={props.elementType} className={inputClass.join(' ')} {...props.elementConfig} onChange={props.change}   value={props.value} />

            </>)
            break;
        case ('textarea'):
                inputElement = (<>
                <label>{props.labelValue} {props.isRequired ? <strong style={{color:'red'}}>*</strong>:null}</label>
                <textarea type={props.elementType} className={inputClass.join(' ')} {...props.elementConfig} onChange={props.change}   value={props.value} />
    
                </>)
        break;
        case 'select':
            inputElement = (<>
            <label>{props.labelValue}{props.isRequired ? <strong style={{color:'red'}}>*</strong>:null}</label>
            <select className={inputClass.join(' ')}  onChange={props.change} value={props.value}>
                {props.elementConfig.options.map( e =>{
                return (<option key={e.value}value ={e.value}>{e.displayName}</option>) 
                }
                )}
            </select>
            </>)
                break;
        case ('checkbox'):
            inputElement = (<>
                <div className="form-check form-check-inline">
                <input type={props.elementType} className={['form-check-input', classes.inputElement].join(' ')} {...props.elementConfig} id={props.id} onChange={props.change}   value={props.value}/>
                <label className= "form-check-label" htmlFor={props.id}>{props.labelValue}{props.isRequired ? <strong style={{color:'red'}}>*</strong>:null}</label>
                </div>
            </>
            )
            break;
        case 'main_label':
            inputElement = (
            <div>
                <label>{props.labelValue}</label>
            </div>)
            break;
        case 'date':
            inputElement = (<>
                <label>{props.labelValue}{props.isRequired ? <strong style={{color:'red'}}>*</strong>:null}</label>
                <input type={props.elementType} className={inputClass.join(' ')} {...props.elementConfig} onChange={props.change}   value={props.value} />
                </>)
            break;
        default:
            inputElement = (<>
            <label>{props.labelValue}</label>
            <input type={props.elementType} className={inputClass.join(' ')} {...props.elementConfig} onChange={props.change}   value={props.value} />

            </>)

        
    }

    return (
        <div className ={sizeClass.join(' ')}>
          
            {inputElement}
        </div>
    )
}

export default Input;