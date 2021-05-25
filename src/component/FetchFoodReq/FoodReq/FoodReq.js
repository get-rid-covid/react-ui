import React from 'react';
import classes from './Donar.module.css'
import * as labi from '../../../utils/Constants/EnglishLabels'
import {timestampConvertion,sendToDonarWhatsapp} from '../../../utils/updateData/updateState'
import { faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';

const Donar = (props) =>{
  
const details = (<div className={classes.InnerData}>
                  <div><strong>{labi.NAME}:</strong> {props.details.name}</div> 
                  <div><strong>{labi.ADDRESS}:</strong> {props.details.address}</div>
                  <div><strong>{'Is Covid Patient'}:</strong> {props.details.isCovid ? 'Yes':'No'}</div>
                  <div><strong>{labi.meals_required}:</strong> {props.details.requiredMeals}</div>

                  <div className='row'>
                    <div className={classes.PhoneNumber}>
                      <a href={'tel:+91'+props.details.phoneNumber} className='btn btn-primary'><FontAwesomeIcon icon={faPhoneAlt} />{" "+props.details.phoneNumber}</a> 
                      </div>
                       <div className={classes.Whatsapp}>
                      <a href={sendToDonarWhatsapp(props.details)} className='btn btn-success'><FontAwesomeIcon icon={faWhatsapp} />{" "+labi.WHATSAPP_ME}</a> 
                    </div> 
                </div> 
                  
                  
                </div>) 
return(<div className= {classes.Donar}>
    {details}
</div> ) 
}

export default Donar;