import React,{Component} from 'react'
import SideDrawer from '../../component/Navigations/SideDrawer/SideDrawer'
import ToolBar from '../../component/Navigations/ToolBar/ToolBar'
import Aux from '../Auxilary/Auxilary'
import classes from './Layout.module.css'
class Layout extends Component {
    state = {
        isToggled : false
    }

    toggleHandler = () =>{
        this.setState(prevState =>{
            return{
                isToggled:!prevState.isToggled
            }
        })
    }
    closeTaggleHandler = () =>{
        this.setState({
            isToggled:false
        })
    }
        
    render(){
       return( 
    <Aux>
        <ToolBar sideToggle={this.toggleHandler}></ToolBar>
        <SideDrawer open={this.state.isToggled} close={this.closeTaggleHandler}></SideDrawer>
        <main className={classes.mainClass}>{this.props.children}</main>
    </Aux>
    )
    }
}

export default Layout;