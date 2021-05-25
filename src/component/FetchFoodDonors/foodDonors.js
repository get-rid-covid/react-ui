import React,{Component} from 'react';
import FoodDonor from './FoodDonors/FoodDonor'
import {connect} from 'react-redux'
import * as orgAction from '../../store/actions/index'
import Pagination from '../../UI/Pagination/Pagination'
import Loader from '../../UI/Loader/loader'
import {} from '../../FirebaseDb/firebase'
import classes from './foodDonors.module.css';
class FetchFoodDonors extends Component{
    state = {
        donarDetails :null,
        currentPage:1,
        noOfRecordsPerPage:6,
        listCount:0        
    }
    componentDidMount(){
         this.props.getAllFoodDonors()
    }    

    getDonarsRecord = (data) =>{
        const availability = null
        
       return data ? data.map( e =>{
            return (<FoodDonor key={e.id}details={e}> </FoodDonor>)
        }) : null
    }
    
    paginationHandler = (number)=>{
         this.setState({
             currentPage:number
        })
    }

    render(){
        let covidBedList = this.props.covidBeds ?  [...this.props.covidBeds]:[];
        let covidBeds = this.props.loading ? <Loader/> : null;
        if(covidBedList.length>0){
           const lastIndex =  this.state.currentPage* this.state.noOfRecordsPerPage; 
           const firstIndex =  lastIndex - this.state.noOfRecordsPerPage ;
           const pageDonars = covidBedList.slice(firstIndex,lastIndex)
           covidBeds = this.getDonarsRecord(pageDonars); 
        }
        
       return( 
        <div className="container">
            <div className={classes.topClass}> <strong> Donors</strong></div>
            <div className="row">
                {covidBeds}
            </div>
         <Pagination pagination={this.paginationHandler}  totalRecords={covidBedList.length} recordsPerPage={this.state.noOfRecordsPerPage} /> 
        </div>)
    }

}

const mapStatesToProps  = (state) =>{
    return{
        loading:state.foodReducer.loading,
        covidBeds:state.foodReducer.foodDonors
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getAllFoodDonors : () => dispatch(orgAction.fetchFoodDonate({}))
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(FetchFoodDonors);
