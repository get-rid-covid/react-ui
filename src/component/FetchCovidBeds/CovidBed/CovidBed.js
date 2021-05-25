import React from 'react';
import classes from './Donar.module.css'
import * as labi from '../../../utils/Constants/EnglishLabels'
import {timestampConvertion,sendToDonarWhatsapp} from '../../../utils/updateData/updateState'
import { faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';

const Donar = (props) =>{
  const availability = (<div className={classes.parentAvailClass}>
    {props.details.icuBeds_avail ? (<div className={classes.availClass}> <strong>{labi.ICU_BEDS}:</strong> {props.details.icuBeds_Qty ?props.details.icuBeds_Qty : 'not metioned'}</div>) : null}  
    {props.details.oxygenBeds_avail ? (<div className={classes.availClass}> <strong>{labi.OXYGEN_BEDS}:</strong> {props.details.oxygenBeds_Qty ?props.details.oxygenBeds_Qty : 'not metioned'}</div>):null}
    {props.details.ventilatorBeds_avail ? (<div className={classes.availClass}> <strong>{labi.Ventialtor_BEDS}:</strong> {props.details.ventilatorBeds_Qty ?props.details.ventilatorBeds_Qty : 'not metioned'}</div>):null}
    {props.details.onlyBeds_avail ? (<div className={classes.availClass}> <strong>{labi.ONLY_BEDS}:</strong> {props.details.onlyBeds_Qty ?props.details.onlyBeds_Qty : 'not metioned'}</div>):null}
  </div>)
const details = (<div className={classes.InnerData}>
                  <div><strong>{labi.ORG_NAME}:</strong> {props.details.orgName}</div> 
                  <div><strong>{labi.CONT_NAME}: </strong>{props.details.contactName} </div> 
                  <div><strong>{labi.ADDRESS}:</strong> {props.details.address}</div>
                  {availability}
                  {/* <div className='row'> */}
                    <div className={classes.PhoneNumber}>
                      <a href={'tel:+91'+props.details.phoneNumber} className='btn btn-primary'><FontAwesomeIcon icon={faPhoneAlt} />{" "+props.details.phoneNumber}</a> 
                      </div>
                      {/* <div className={classes.Whatsapp}>
                      <a href={sendToDonarWhatsapp(props.details)} className='btn btn-success'><FontAwesomeIcon icon={faWhatsapp} />{" "+labi.WHATSAPP_ME}</a> 
                    </div> */}
                     
                  {/* </div> */}
                  
                  
                </div>) 
return(<div className= {classes.Donar}>
    {details}
</div> ) 
}

export default Donar;