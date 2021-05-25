import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary/Auxilary'
import classes from './volunteerBuilder.module.css'
import AuthForm from '../../component/authForm/authForm'
import CatoryButtons from '../../component/AllCategoryButton/allCategoryButton'
import Modal from '../../UI/Modal/Modal'
import InfoModel from '../../UI/InfoModel/InfoModel'
import PlasmaBuilder from '../../Builder/PlasmaBuilder/PlasmaBuilder'
import firebase from '../../FirebaseDb/firebase'
import * as orgAction from '../../store/actions/index'

import {connect} from 'react-redux'
class VolunteerBuilder extends Component{
    state = {
        loginModal : false
    }
    loginHandler = (event) =>{
        event.preventDefault();
        let b = true;
        if(firebase.auth().currentUser){
            this.props.initLogout();
        }
        else{
            this.props.openLoginModel()
        }
        
    }
    cancelHandler = ()=>{
        this.setState({
            loginModal:false
        })
    }
    render(){
        return(
            <Aux>
                <div className={classes.volunteer}>
                    <div className={classes.LoginClass}>
                        <button  className="btn btn-success" onClick={this.loginHandler}>{firebase.auth().currentUser ? 'Logout' : 'Login' }</button>
                    </div> 
                    <div>
                    <InfoModel infoModel={this.props.infoAuthModel} infoMessage ={this.props.infoAuthMessage}/>
                    <Modal giveFormHeight={false} show={this.props.isAuthModel}>
                        <AuthForm oncancel={this.cancelHandler}/>
                    </Modal>
                    <CatoryButtons/>
                        {/* //buttonClass */}
                        {/* //requirementClass */}
                        <PlasmaBuilder/>
                    </div>
                </div>
                
            </Aux>
        )
    }

}


const mapStatesToProps  = (state) =>{
    return{
        isAuthModel:state.authReducer.isModelOpen,
        infoAuthModel:state.authReducer.infoModel,
        infoAuthMessage:state.authReducer.infoMessage
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        openLoginModel : () => dispatch(orgAction.openLoginModel()),
        initLogout : () => dispatch(orgAction.initLogout())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(VolunteerBuilder);

