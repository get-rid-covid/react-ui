import React,{Component} from 'react'
import FoodDonorForm from '../../component/FoodDonateForm/foodDonateForm'
import FoodReqForm from '../../component/FoodReqForm/foodReqForm'
import CovidBedReqForm from '../../component/covidBedReqForm/covidBedReqForm'
import DeactivatForm from '../../component/DeactivateRecord/deactivateRecord'
import HandlerButton from '../../component/PlasmaHandlerButton/plasmaHandlerButton'
import Modal from '../../UI/Modal/Modal'
import * as labi from '../../utils/Constants/EnglishLabels'
import * as orgAction from '../../store/actions/index'
import FetchCovidBeds from '../../component/FetchCovidBeds/fetchCovidBeds'
import FetchCovidBedsReq from '../../component/FetchCovidBedsReq/fetchCovidBedsReq'
import CovidBedBuilder from '../../Builder/CovidBedBuilder/CovidBuilder'
import FoodBuilder from '../../Builder/FoodBuilder/FoodBuilder'

import {connect} from 'react-redux'


class FoodContainer extends Component{
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
         this.props.openModal('foodDonorPopup')
    }
     openRequestPopup = () =>{
        this.setState({
            modalHeight:true
        })
        this.props.openModal('foodReqPopup')        
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
                case 'foodDonorPopup':
                    popupForm= <FoodDonorForm onCancel={this.closePopup}/>
                    break;
                case 'foodReqPopup':
                    popupForm= <FoodReqForm onCancel={this.closePopup}/>
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
            firstClick={this.openRegisterPopup} firstLabel={labi.ADD_DONOR} 
            secondClick={this.openRequestPopup} secondLabel={labi.RAISE_REQUEST}
            thirdClick={this.openDeactivatePopup} thirdLabel={labi.DELETE_RECORD}/> 
        <FoodBuilder/>
        {/* <FetchCovidBeds/> */}
        {/* <CovidBedBuilder/> */}
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

export default connect(mapStateToProps,mapDispatchToProps)(FoodContainer);