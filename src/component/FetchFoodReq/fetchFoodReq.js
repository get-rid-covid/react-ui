import React,{Component} from 'react';
import FoodReq from './FoodReq/FoodReq'
import {connect} from 'react-redux'
import * as orgAction from '../../store/actions/index'
import Pagination from '../../UI/Pagination/Pagination'
import Loader from '../../UI/Loader/loader'
import {} from '../../FirebaseDb/firebase'
import classes from './fetchFoodReq.module.css';
class FetchFoodDonors extends Component{
    state = {
        donarDetails :null,
        currentPage:1,
        noOfRecordsPerPage:6,
        listCount:0        
    }
    componentDidMount(){
         this.props.getAllFoodReq()
    }    

    getDonarsRecord = (data) =>{
        const availability = null
        
       return data ? data.map( e =>{
            return (<FoodReq key={e.id}details={e}> </FoodReq>)
        }) : null
    }
    
    paginationHandler = (number)=>{
         this.setState({
             currentPage:number
        })
    }

    render(){
        let foodReqList = this.props.foodRequester ?  [...this.props.foodRequester]:[];
        let foodReq = this.props.loading ? <Loader/> : null;
        if(foodReqList.length>0){
           const lastIndex =  this.state.currentPage* this.state.noOfRecordsPerPage; 
           const firstIndex =  lastIndex - this.state.noOfRecordsPerPage ;
           const pageDonars = foodReqList.slice(firstIndex,lastIndex)
           foodReq = this.getDonarsRecord(pageDonars); 
        }
        
       return( 
        <div className="container">
            <div className={classes.topClass}> <strong> Donors</strong></div>
            <div className="row">
                {foodReq}
            </div>
         <Pagination pagination={this.paginationHandler}  totalRecords={foodReqList.length} recordsPerPage={this.state.noOfRecordsPerPage} /> 
        </div>)
    }

}

const mapStatesToProps  = (state) =>{
    return{
        loading:state.foodReducer.loading,
        foodRequester:state.foodReducer.foodRequester
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getAllFoodReq : () => dispatch(orgAction.fetchFoodReq({}))
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(FetchFoodDonors);
