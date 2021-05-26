import React,{Component} from 'react'
import { faBed,faPumpMedical,faEyeDropper,faVial,faHamburger} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import classes from './mainContainer.module.css'
import * as navi from '../../utils/Constants/routeLinks'
import Disclaimers from '../../Builder/MainPageBuilder/mainPageBuilder'
class mainPage extends Component{

    covidBedHandler = ()=>{
         this.props.history.push(navi.COVIDBEDS);
    }
    bloodPlasmaHandler = ()=>{
        this.props.history.push(navi.HOME_LINK);
    }
    foodHanlder = ()=>{
        this.props.history.push(navi.FOODSSOURCE);
    }
    oxygenHandler = ()=>{
        this.props.history.push(navi.OXYGEN);
    }
    render(){
        const btnClass = [classes.btnClass,"col-md-6 col-6 col-sm-6 col-xs-6"].join(' ');
        const rowClass = [classes.rowClass,'row'].join(' ')
        return (
           <div className="container">
               <div className={rowClass}>
                   <div className={btnClass} >
                       <button onClick={this.oxygenHandler}><FontAwesomeIcon icon={faPumpMedical} /> Oxygen</button>
                   </div>
                   <div className={btnClass} >
                       <button onClick={this.covidBedHandler}> <FontAwesomeIcon icon={faBed} />Covid Beds</button>
                   </div>
               </div>
               <div className={rowClass}>
                   <div className={btnClass} >
                       <button onClick={this.bloodPlasmaHandler}><FontAwesomeIcon icon={faVial} /> Blood Plasma</button>
                   </div>
                   <div className={btnClass} >
                       <button onClick={this.foodHanlder}> <FontAwesomeIcon icon={faHamburger} />food</button>
                   </div>
               </div>
               {/* <div className={rowClass}>
                   <div className={btnClass} >
                       <button><FontAwesomeIcon icon={faPumpMedical} /> Oxygen</button>
                   </div>
                   <div className={btnClass} >
                       <button> <FontAwesomeIcon icon={faBed} />Covid Beds</button>
                   </div>
               </div> */}
    <Disclaimers/>
           </div>
        

        )
    }
}

export default mainPage;