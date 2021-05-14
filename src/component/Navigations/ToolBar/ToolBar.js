import React from 'react'
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import Toggle from '../SideDrawer/DrawToggle/Toggle'
const  ToolBar= (props) => {
    
        return(
            <header className={classes.ToolBar}>
                <Toggle clicked={props.sideToggle}/>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav className={classes.DesktopCloseOnly}>
                <NavigationItems/>
                </nav>
                
            </header>

        )
    
}

export default ToolBar;