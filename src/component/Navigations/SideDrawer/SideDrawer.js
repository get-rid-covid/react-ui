import React,{Component} from 'react'
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo'
import Aux from '../../../hoc/Auxilary/Auxilary'
import NavigationItems from '../NavigationItems/NavigationItems';
class SideDrawer extends Component {
    state = {
        sideDrawerClose : true
    }

    render(){
        let togClasses = [classes.SideDrawer,classes.close];
        
        if(this.props.open){
            togClasses =[classes.SideDrawer,classes.Open];
        }
        
        return(
            <Aux>
                
                <div className={togClasses.join(' ')}>

                    <div  className={classes.closeBtn} onClick ={this.props.close}> 
                        &times;
                    </div>
                    
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>    
                </nav>
            </div>
            </Aux>
            
        )
    }
}

export default SideDrawer;