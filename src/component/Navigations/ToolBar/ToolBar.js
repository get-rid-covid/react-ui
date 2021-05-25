import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import classes from './Toolbar.module.css'
import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import Toggle from '../SideDrawer/DrawToggle/Toggle'
import * as navi from '../../../utils/Constants/routeLinks'
const  ToolBar= (props) => {
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push(navi.MAIN_PAGE), [history]);
        return(
            <header className={classes.ToolBar}>
                <Toggle clicked={props.sideToggle}/>
                <div className={classes.Logo} onClick= {handleOnClick}>
                    <Logo/>
                </div>
                <nav className={classes.DesktopCloseOnly}>
                <NavigationItems/>
                </nav>
                
            </header>

        )
    
}

export default ToolBar;