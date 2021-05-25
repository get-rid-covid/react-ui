import React,{Component} from 'react'
import CovidBedForm from '../../component/CovidBedsForm/CovidBedsForm'
import CovidBedReqForm from '../../component/covidBedReqForm/covidBedReqForm'
import DeactivatForm from '../../component/DeactivateRecord/deactivateRecord'
import HandlerButton from '../../component/PlasmaHandlerButton/plasmaHandlerButton'
import Modal from '../../UI/Modal/Modal'
import * as labi from '../../utils/Constants/EnglishLabels'
import * as orgAction from '../../store/actions/index'
import FetchCovidBeds from '../../component/FetchCovidBeds/fetchCovidBeds'
import FetchCovidBedsReq from '../../component/FetchCovidBedsReq/fetchCovidBedsReq'
import CovidBedBuilder from '../../Builder/CovidBedBuilder/CovidBuilder'
import {connect} from 'react-redux'


class CovidBedsContainer extends Component{
    state={
        modalHeight:false,
         popUpValue:null,
         isDonar:true,
         isFilter:false
     }
     
     openRegisterPopup = () =>{
         this.setState({
             modalHeight:true
         })
         this.props.openModal('covidBedsRegisterPopup')
    }
     openRequestPopup = () =>{
        this.setState({
            modalHeight:true
        })
        this.props.openModal('covidBedsRequestPopup')        
     }
     openDeactivatePopup = () =>{
        this.setState({
            modalHeight:false
        })
        this.props.openModal('deactivatePopup')
     }

    render(){
        let popupForm = null;
        document.body.style.overflow = 'unset';
        if(this.props.modalStatus){
            document.body.style.overflow = 'hidden';
            switch (this.props.modalType) {
                case 'covidBedsRegisterPopup':
                    popupForm= <CovidBedForm onCancel={this.closePopup}/>
                    break;
                case 'covidBedsRequestPopup':
                    popupForm= <CovidBedReqForm onCancel={this.closePopup}/>
                    break;
                case 'deactivatePopup':
                    popupForm= <DeactivatForm onCancel={this.closePopup}/>
                    break;    
                // case 'filterForm':
                //     popupForm = <PlasmaFilter onCancel={this.closePopup} isDonar ={this.state.isDonar}/>
                default:
                    break;
            }
        }
    return(
    <div>
        <Modal giveFormHeight={this.state.modalHeight} show={this.props.modalStatus}>
            <div>
            {popupForm}
            </div>
        </Modal>
        
        <HandlerButton 
            firstClick={this.openRegisterPopup} firstLabel={labi.ADD_BED} 
            secondClick={this.openRequestPopup} secondLabel={labi.RAISE_REQUEST}
            thirdClick={this.openDeactivatePopup} thirdLabel={labi.DELETE_RECORD}/>
        {/* <FetchCovidBeds/> */}
        <CovidBedBuilder/>
        {/* <FetchCovidBedsReq/> */}
    </div>
            
            
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        modalStatus : state.commonReducer.isModelOpen,
        modalType: state.commonReducer.modalType   
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        openModal : (modalType) => dispatch(orgAction.onClickOpenModal(modalType)),
        closeModal : () => dispatch(orgAction.onCloseModal())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CovidBedsContainer);