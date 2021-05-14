import React,{Component} from 'react';
import FetchPlasmaDonars from '../../component/FetchDonarsList/fetchPlasmaDonars'
import FetchRequester from '../../component/FetchPlasmReqList/fetchPlasmaReqList'
import PlasmaFilter from '../../component/PlasmaFilter/PlasmaFilter'
import PlasmaModalButtons from '../../component/OpenPlasmaModals/openPlasmaModal'
import PlasmaHandlerButton from '../../component/PlasmaHandlerButton/plasmaHandlerButton'
import Modal from '../../UI/Modal/Modal'
import PlasmaDonarsRegForm from '../../component/plasmaDonarsForm/plasmaDonarsForm'
import PlasmaReqForm from '../../component/RequestPlasmaForm/RequestPlasmaForm'
import DeactivatForm from '../../component/DeactivateRecord/deactivateRecord'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import classes from './HomeBuilder.module.css'
import * as orgAction from '../../store/actions/index'
import {connect} from 'react-redux'
import Quotes from '../../utils/HeroQuotes/AvengersQuotes'

class HomeBuilder extends Component{
    state={
       modalHeight:false,
        popUpValue:null,
        isDonar:true,
        isFilter:false
    }
    
    openDonarPopup = () =>{
        this.setState({
            popUpValue:'donarPopup',
            modalHeight:true
          
        })
        this.props.onClickDonarForm();
       

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
        this.props.onCloseDonarForm();
        this.props.onCloseFilter();

    }
    toggleDonarHandler = () =>{
        this.setState( prevState =>{
            return {
                isDonar : !prevState.isDonar
            }
        })
    }
    isModalPopup = () =>{
        return this.props.isModelDonarOpen || this.props.isModelRequestOpen || this.props.isModelDeactivateOpen || this.props.isFilterOpen;
    }

    render(){
        let popupForm = null;
        document.body.style.overflow = 'unset';
        if(this.isModalPopup()){
            document.body.style.overflow = 'hidden';
            switch (this.state.popUpValue) {
                case 'donarPopup':
                    popupForm= <PlasmaDonarsRegForm onCancel={this.closePopup}/>
                    break;
                case 'requestPopup':
                    popupForm= <PlasmaReqForm onCancel={this.closePopup}/>
                    break;
                case 'deactivatePopup':
                    popupForm= <DeactivatForm onCancel={this.closePopup}/>
                    break;    
                case 'filterForm':
                    popupForm = <PlasmaFilter onCancel={this.closePopup} isDonar ={this.state.isDonar}/>
                default:
                    break;
            }
        }
        let donarReqFetch = <FetchRequester/>;
        if(this.state.isDonar){
            donarReqFetch = <FetchPlasmaDonars/>
        }

        return(
            <div>
                <Modal giveFormHeight={this.state.modalHeight} show={this.isModalPopup()}>
                    <div>
                    {popupForm}
                    </div>
                </Modal>
                 <Quotes/> 
                <PlasmaHandlerButton clickDonar={this.openDonarPopup} clickRequest={this.openRequestPopup} clickDeactivate={this.openDeactivatePopup}/>
                <div className={classes.toggleClass}>
                    <div className={["btn-group", classes.externaBtnClass].join(' ')} data-toggle="button" role="group" aria-label="Basic example">
                    <button type="button"  className={this.state.isDonar ? "btn btn-primary" : "btn btn-secondary"} onClick={this.toggleDonarHandler} > Donors</button>
                    <button type="button" className={this.state.isDonar ? "btn btn-secondary" : "btn btn-primary"} onClick={this.toggleDonarHandler}>Requests</button>
                    </div>
                    <div className={classes.filterClass}>
                        <button className='btn btn-info' onClick={this.openFilterForm}>filter</button>
                    </div>
                </div>
                
                {donarReqFetch}
            </div>
            
               
            
        )
    }
    }
    
    const mapStatesToProps  = (state) =>{
        return{
            isModelDonarOpen:state.plasmaDonarReducer.isModelOpen,
            isFilterOpen:state.plasmaDonarReducer.isFilter,
            isModelRequestOpen:state.plasmaReqReducer.isModelOpen,
            isModelDeactivateOpen:state.feedbackReducer.isModelOpen
           
        }
    }
    const mapDispatchToProps = (dispatch) =>{
        return {
            onClickDonarForm : () => dispatch(orgAction.onClickDonarForm()),
            onClickReqForm : () => dispatch(orgAction.onClickReqForm()),
            onClickDeactivateForm : () => dispatch(orgAction.onClickDeactivateForm()),
            onClickFilter : () => dispatch(orgAction.onClickFilter()),
            onCloseFilter : () => dispatch(orgAction.onCloseFilter()),

            onCloseDonarForm : () => dispatch(orgAction.onCloseDonarForm()),
            onCloseReqForm : () => dispatch(orgAction.onCloseReqForm()),
            onCloseDeactivateForm : () => dispatch(orgAction.onCloseDeactivateForm())
        }
    }
    
    export default connect(mapStatesToProps,mapDispatchToProps)(HomeBuilder);
