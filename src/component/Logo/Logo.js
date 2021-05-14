import React from 'react';
import imgSrc from '../../assests/get-rid-covid.png'
import classes from './Logo.module.css'
const logo = (props) =>{
    return(
        <div className={classes.Logo}>
            <img  alt="Arg-Covid" src={imgSrc}/>
        </div>
    );
    
}

export default logo;
