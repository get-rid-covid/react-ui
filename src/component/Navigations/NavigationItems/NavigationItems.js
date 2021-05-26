import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import * as navi from '../../../utils/Constants/routeLinks'
import * as labi from '../../../utils/Constants/EnglishLabels'
import classes from './NavigationItems.module.css'
const navigationItems = (props) =>{

    return(
        <ul className={classes.NavigationItems}>
            {/* <NavigationItem link={navi.MAIN_PAGE} exact name ={labi.HOME_LABEL}></NavigationItem>
            <NavigationItem link={navi.HOME_LINK} exact name ={labi.PLASMA_HOME}></NavigationItem>
            <NavigationItem link={navi.FEEDBACK} name ={labi.FEEDBACK}></NavigationItem>
             <NavigationItem link={navi.OXYGEN} name ={labi.OXYGEN}></NavigationItem>
            <NavigationItem link={navi.VOLUNTEER} name ={labi.VOLUNTEER}></NavigationItem>
            <NavigationItem link={navi.COVIDBEDS} name ={labi.COVID_BEDS}></NavigationItem>
            <NavigationItem link={navi.FOODSSOURCE} name ={labi.FOOD}></NavigationItem> */}
             <NavigationItem link={navi.MAIN_PAGE} exact name ={labi.HOME_LABEL}></NavigationItem>
        <NavigationItem link={navi.FEEDBACK} name ={labi.FEEDBACK}></NavigationItem>


        </ul>
    )
}

export default navigationItems;