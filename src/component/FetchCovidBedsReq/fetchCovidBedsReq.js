import React,{Component} from 'react';
import CovidBedReq from './CovidBedReq/CovidBedReq'
import {connect} from 'react-redux'
import * as orgAction from '../../store/actions/index'
import Pagination from '../../UI/Pagination/Pagination'
import Loader from '../../UI/Loader/loader'
import {} from '../../FirebaseDb/firebase'
import classes from './fetchPlasmaDonars.module.css';
class FetchCovidBeds extends Component{
    state = {
        donarDetails :null,
        currentPage:1,
        noOfRecordsPerPage:6,
        listCount:0        
    }
    componentDidMount(){
         this.props.getAllCovidBeds()
    }    

    getDonarsRecord = (data) =>{
        const availability = null
        
       return data ? data.map( e =>{
            return (<CovidBedReq key={e.id}details={e}> </CovidBedReq>)
        }) : null
    }
    
    paginationHandler = (number)=>{
         this.setState({
             currentPage:number
        })
    }

    render(){
        let covidBedList = this.props.covidBedsReq ?  [...this.props.covidBedsReq]:[];
        let covidBeds = this.props.loading ? <Loader/> : null;
        if(covidBedList.length>0){
           const lastIndex =  this.state.currentPage* this.state.noOfRecordsPerPage; 
           const firstIndex =  lastIndex - this.state.noOfRecordsPerPage ;
           const pageDonars = covidBedList.slice(firstIndex,lastIndex)
           covidBeds = this.getDonarsRecord(pageDonars); 
        }
        
       return( 
        <div className="container">
            <div className={classes.topClass}> <strong> Requests</strong></div>
            <div className="row">
                {covidBeds}
            </div>
         <Pagination pagination={this.paginationHandler}  totalRecords={covidBedList.length} recordsPerPage={this.state.noOfRecordsPerPage} /> 
        </div>)
    }

}

const mapStatesToProps  = (state) =>{
    return{
        loading:state.covidBedReducer.loading,
        covidBedsReq:state.covidBedReducer.covidBedsReq
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getAllCovidBeds : () => dispatch(orgAction.fetchCovidBedsReq({}))
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(FetchCovidBeds);
