import React,{Component} from 'react';
import Modal from '../../UI/Modal/Modal'
import OxygenDealersRegForm from '../../component/oxygenDealersForm/oxygenDealersForm'
import OxygenHandlerButton from '../../component/OxygenHandlerButton/OxygenHandlerButton';
import OxygenRequestForm from '../../component/RequestOxygenForm/RequestOxygenForm';
import OxygenFilter from '../../component/OxygenFilter/OxygenFilter';
import DeactivateOxygenForm from '../../component/DeactivateOxygenForm/DeactivateOxygenForm';
import {connect} from 'react-redux'
import * as orgAction from '../../store/actions/index'
import classes from './OxygenContainer.module.css'; 
import FetchOxygenRequester from '../../component/FetchOxygenRequester/FetchOxygenRequester'
import FetchOxygenDealers from '../../component/FetchOxygenDealers/FetchOxygenDealers'

class OxygenContainer extends Component {
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
          
        });
       
        this.props.onClickDealerForm();
        console.log(this.state);

    }
    openRequestPopup = () =>{
        this.setState({
            popUpValue:'requestPopup',
            modalHeight:true
          })
          this.props.onClickReqForm();
          console.log(this.state);
        
    }
    openDeactivatePopup = () =>{
        this.setState({
            popUpValue:'deactivatePopup',
            modalHeight:false
           
        });
        this.props.onClickOxygenDeactivateForm();

    }
    openFilterForm = () =>{
        this.setState({
            popUpValue:'filterForm',
            modalHeight:false
        })
       
        this.props.onClickOxygenFilter();
        console.log(this.state);
    }
    closePopup = () =>{
        this.props.onCloseOxygenDeactivateForm();
        this.props.onCloseReqForm();
        this.props.onCloseDealerForm();
        this.props.onCloseOxygenFilter();

    }
    toggleDealerHandler = () =>{
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
        }
        switch (this.state.popUpValue) {
            case 'dealerPopup':
                popupForm= <OxygenDealersRegForm onCancel={this.closePopup}/>
                break;
            case 'requestPopup':
                popupForm= <OxygenRequestForm onCancel={this.closePopup}/>
                break;
            case 'deactivatePopup':
                popupForm= <DeactivateOxygenForm onCancel={this.closePopup}/>
                break;    
            case 'filterForm':
                popupForm = <OxygenFilter onCancel={this.closePopup} isDealer ={this.state.isDealer}/>
                break;
            default:
                    break;
        }

        let dealerReqFetch = <FetchOxygenRequester/>;
        if(this.state.isDealer){
            dealerReqFetch = <FetchOxygenDealers/>
        }

        return (
        <div>
            <Modal giveFormHeight={this.state.modalHeight} show={this.isModalPopup()}>
                    <div>
                    {popupForm}
                    </div>
                </Modal>
            
            <OxygenHandlerButton clickDealer={this.openDealerPopup} clickRequest={this.openRequestPopup} clickDeactivate={this.openDeactivatePopup} />
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
    //console.log(state);
    return{
        isModelDealerOpen:state.oxygenDetailReducer.isModelOpen,
        isFilterOpen:state.oxygenDetailReducer.isFilter,
        isModelRequestOpen:state.oxygenRequestReducer.isModelOpen,
        isModelDeactivateOpen:state.feedbackReducer.isModelOpen
       
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
     onClickDealerForm : () => dispatch(orgAction.onClickDealerForm()),
     onClickReqForm : () => dispatch(orgAction.onClickOxygenReqForm()),
     onCloseDealerForm : () => dispatch(orgAction.onCloseDealerForm()),
     onCloseReqForm : () => dispatch(orgAction.onCloseOxygenReqForm()),
     onClickOxygenFilter : () => dispatch(orgAction.onClickOxygenFilter()),
     onCloseOxygenFilter : () => dispatch(orgAction.onCloseOxygenFilter()),
     onClickOxygenDeactivateForm : () => dispatch(orgAction.onClickOxygenDeactivateForm()),
     onCloseOxygenDeactivateForm : () => dispatch(orgAction.onCloseOxygenDeactivateForm())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(OxygenContainer);