import React from 'react';
import classes from './requester.module.css'
import * as labi from '../../../utils/Constants/EnglishLabels'
import {sendToDonarWhatsapp} from '../../../utils/updateData/updateState'
import { faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';

const Requester = (props) =>{
const details = (<div className={classes.InnerData}>
                  <div><strong>{labi.PAT_NAME}:</strong> {props.details.patientName}</div> 
                  <div><strong>{labi.BLOOD_GROUP}: </strong> <strong style={{color:'red'}}>{props.details.bloodGroup}</strong> </div> 
                  <div><strong>{labi.Contact_NAME}:</strong> {props.details.contactName}</div>
                  <div><strong>{labi.ADDRESS}:</strong> {props.details.address}</div>
                  <div className='row'>
                      <div className={classes.PhoneNumber}>
                      <a href={'tel:+91'+props.details.phoneNumber} className='btn btn-primary'><FontAwesomeIcon icon={faPhoneAlt} />{" "+props.details.phoneNumber}</a> 
                      </div>
                      <div className={classes.Whatsapp}>
                      <a href={sendToDonarWhatsapp(props.details)} className='btn btn-success'><FontAwesomeIcon icon={faWhatsapp} />{" "+labi.WHATSAPP_ME}</a> 
                      </div>
                    
                     
                  </div>
                 
                  
                </div>) 
return(<div className= {classes.Requester}>
    {details}
</div> ) 
}

export default Requester;