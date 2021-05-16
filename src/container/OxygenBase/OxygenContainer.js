import React,{Component} from 'react';
import FetchPlasmaDonars from '../../component/FetchDonarsList/fetchPlasmaDonars'
import FetchRequester from '../../component/FetchPlasmReqList/fetchPlasmaReqList'
import PlasmaFilter from '../../component/PlasmaFilter/PlasmaFilter'
import PlasmaModalButtons from '../../component/OpenPlasmaModals/openPlasmaModal'
import OxygenHandlerButton from '../../component/OxygenHandlerButton/oxygenHandlerButton'
import Modal from '../../UI/Modal/Modal'
import OxygenDealerRegForm from '../../component/OxygenDealers/OxygenDealersForm';
import PlasmaReqForm from '../../component/RequestPlasmaForm/RequestPlasmaForm'
import DeactivatForm from '../../component/DeactivateRecord/deactivateRecord'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import classes from './HomeBuilder.module.css'
import * as orgAction from '../../store/actions/index'
import {connect} from 'react-redux'
import Quotes from '../../utils/HeroQuotes/AvengersQuotes'

class OxygenContainer extends Component{
    state={
       modalHeight:false,
        popUpValue:null,
        isDealer:true,
        isFilter:false
    }
    
    openDealerPopup = () =>{
        this.setState({
            popUpValue:'dealerPopup',
            modalHeight:true
          
        })
        this.props.onClickDealerForm();
       

    }
    openRequestPopup = () =>{
        this.setState({
            popUpValue:'requestPopup',
            modalHeight:true
          })
          this.props.onClickReqForm();
        
    }
    openDeactivatePopup = () =>{
        this.setState({
            popUpValue:'deactivatePopup',
            modalHeight:false
           
        });
        this.props.onClickDeactivateForm();

    }
    openFilterForm = () =>{
        this.setState({
            popUpValue:'filterForm',
            modalHeight:false
        })
        this.props.onClickFilter();
    }
    closePopup = () =>{
        this.props.onCloseDeactivateForm();
        this.props.onCloseReqForm();
        this.props.onCloseDealerForm();
        this.props.onCloseFilter();

    }
    toggleDonarHandler = () =>{
        this.setState( prevState =>{
            return {
                isDealer : !prevState.isDealer
            }
        })
    }
    isModalPopup = () =>{
        return this.props.isModelDealerOpen || this.props.isModelRequestOpen || this.props.isModelDeactivateOpen || this.props.isFilterOpen;
    }

    render(){
        let popupForm = null;
        document.body.style.overflow = 'unset';
        if(this.isModalPopup()){
            document.body.style.overflow = 'hidden';
            switch (this.state.popUpValue) {
                case 'dealerPopup':
                    popupForm= <OxygenDealerRegForm onCancel={this.closePopup}/>
                    break;
                case 'requestPopup':
                    popupForm= <OxygenReqForm onCancel={this.closePopup}/>
                    break;
                case 'deactivatePopup':
                    popupForm= <DeactivatForm onCancel={this.closePopup}/>
                    break;    
                case 'filterForm':
                    popupForm = <OxygenFilter onCancel={this.closePopup} isDealer ={this.state.isDealer}/>
                default:
                    break;
            }
        }
        let dealerReqFetch = <FetchRequester/>;
        if(this.state.isDealer){
            dealerReqFetch = <FetchOxygenDealers/>
        }

        return(
            <div>
                <Modal giveFormHeight={this.state.modalHeight} show={this.isModalPopup()}>
                    <div>
                    {popupForm}
                    </div>
                </Modal>
                 <Quotes/> 
                <OxygenHandlerButton clickDealer={this.openDealerPopup} clickRequest={this.openRequestPopup} clickDeactivate={this.openDeactivatePopup}/>
                <div className={classes.toggleClass}>
                    <div className={["btn-group", classes.externaBtnClass].join(' ')} data-toggle="button" role="group" aria-label="Basic example">
                    <button type="button"  className={this.state.isDealer ? "btn btn-primary" : "btn btn-secondary"} onClick={this.toggleDealerHandler} > Dealers</button>
                    <button type="button" className={this.state.isDealer ? "btn btn-secondary" : "btn btn-primary"} onClick={this.toggleDealerHandler}>Requests</button>
                    </div>
                    <div className={classes.filterClass}>
                        <button className='btn btn-info' onClick={this.openFilterForm}>filter</button>
                    </div>
                </div>
                
                {dealerReqFetch}
            </div>
            
               
            
        )
    }
    }
    
    const mapStatesToProps  = (state) =>{
        return{
            isModelDealerOpen:state.oxygenDealerReducer.isModelOpen,
            isFilterOpen:state.oxygenDealerReducer.isFilter,
            isModelRequestOpen:state.oxygenReqReducer.isModelOpen,
            isModelDeactivateOpen:state.feedbackReducer.isModelOpen
           
        }
    }
    const mapDispatchToProps = (dispatch) =>{
        return {
            onClickDealerForm : () => dispatch(orgAction.onClickDealerForm()),
            onClickReqForm : () => dispatch(orgAction.onClickReqForm()),
            onClickDeactivateForm : () => dispatch(orgAction.onClickDeactivateForm()),
            onClickFilter : () => dispatch(orgAction.onClickFilter()),
            onCloseFilter : () => dispatch(orgAction.onCloseFilter()),

            onCloseDealerForm : () => dispatch(orgAction.onCloseDealerForm()),
            onCloseReqForm : () => dispatch(orgAction.onCloseReqForm()),
            onCloseDeactivateForm : () => dispatch(orgAction.onCloseDeactivateForm())
        }
    }
    
    export default connect(mapStatesToProps,mapDispatchToProps)(OxygenContainer);
