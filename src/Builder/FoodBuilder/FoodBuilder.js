import React,{Component} from 'react'
import FetchFoodDonor from '../../component/FetchFoodDonors/foodDonors'
import FetchFoodReq from '../../component/FetchFoodReq/fetchFoodReq'
import classes from './FoodBuilder.module.css'
import Filter from '../../component/FilterCovidBeds/filterCovidBeds'
import {connect} from 'react-redux';
import * as orgAction from '../../store/actions/index'
import Modal from '../../UI/Modal/Modal'
class FoodBuilder extends Component{
    state={
         isDonar:true,
         isFilter:false
     }
    
     toggleDonarHandler = () =>{
        this.setState( prevState =>{
            return {
                isDonar : !prevState.isDonar
            }
        })
    }
    openFilterForm =  ()  =>{
        this.props.openModal('covidBedFilter');

    }
    render(){
        let donarReqFetch = <FetchFoodReq/>;
        if(this.state.isDonar){
            donarReqFetch = <FetchFoodDonor/>
        }
        let popupForm = null;
        document.body.style.overflow = 'unset';
        if(this.props.modalStatus){
            document.body.style.overflow = 'hidden';
            switch (this.props.modalType) {
                case 'covidBedFilter':
                    popupForm=  <Filter isDonar={this.state.isDonar}/>
                    break;
               
                // case 'filterForm':
                //     popupForm = <PlasmaFilter onCancel={this.closePopup} isDonar ={this.state.isDonar}/>
                default:
                    break;
            }
        }
        return(
            <div>
        <Modal giveFormHeight={this.state.modalHeight} show={this.props.modalStatus && popupForm !=null}>
           {popupForm}
        </Modal>
            <div className={classes.toggleClass}>
                    <div className={["btn-group", classes.externaBtnClass].join(' ')} data-toggle="button" role="group" aria-label="Basic example">
                    <button type="button"  className={this.state.isDonar ? "btn btn-primary" : "btn btn-secondary"} onClick={this.toggleDonarHandler} > Food-Donors</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(FoodBuilder);
