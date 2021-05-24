import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import * as navi from '../../../utils/Constants/routeLinks'
import * as labi from '../../../utils/Constants/EnglishLabels'
import classes from './NavigationItems.module.css'
const navigationItems = (props) =>{

    return(
        <ul className={classes.NavigationItems}>
            <NavigationItem link={navi.HOME_LINK} exact name ={labi.PLASMA_HOME}></NavigationItem>
            <NavigationItem link={navi.FEEDBACK} name ={labi.FEEDBACK}></NavigationItem>
            <NavigationItem link={navi.OXYGEN} name ={labi.OXYGEN}></NavigationItem>
        </ul>
    )
}

export default navigationItems;