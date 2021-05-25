import React from 'react'
import classes from './allCategoryButton.module.css'
const allCategoryButtons = (props)=>{
return (
   <div className={classes.allCategoryButton}>
        <div className={[classes.grpBtn,"btn-group blocks"].join(' ')} data-toggle="button" role="group" aria-label="Basic example">
            <button type="button" onClick={props.clickDonar} className={[classes.iBtn,"btn btn-primary"].join(' ')}>Oxygen Supply</button>
            <button type="button" onClick={props.clickRequest} className={[classes.iBtn,"btn btn-dark"].join(' ')}>Covid Beds</button>
            <button type="button" onClick={props.clickDeactivate} className={[classes.iBtn,"btn btn-dark"].join(' ')} >Doctor Councelling</button>
            <button type="button" onClick={props.clickDeactivate} className={[classes.iBtn,"btn btn-dark"].join(' ')} >Blood Plasma</button>
            <button type="button" onClick={props.clickDeactivate} className={[classes.iBtn,"btn btn-dark"].join(' ')} >Medicine Donation</button>

        </div>
   </div>
    )
}

export default allCategoryButtons;