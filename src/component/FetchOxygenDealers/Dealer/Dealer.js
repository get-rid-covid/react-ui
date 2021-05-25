import React from 'react';
import classes from './Dealer.module.css'
import * as labi from '../../../utils/Constants/EnglishLabels'
import {timestampConvertion,sendToDonarWhatsapp} from '../../../utils/updateData/updateState'
import { faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';

const Dealer = (props) =>{
const details = (<div className={classes.InnerData}>
                  <div><strong>{labi.NAME}:</strong> {props.details.dealerName}</div> 
                  
                  <div><strong>{labi.STATE_NAME}:</strong> {props.details.state}</div>
                  <div><strong>{labi.DISTRICTS}:</strong> {props.details.districts}</div>
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

export default Dealer;