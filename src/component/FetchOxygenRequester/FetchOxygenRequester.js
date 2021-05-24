import React,{Component} from 'react';
import OxygenRequest from './OxygenRequest/OxygenRequest'
import {connect} from 'react-redux'
import * as orgAction from '../../store/actions/index'
import Pagination from '../../UI/Pagination/Pagination'
import Loader from '../../UI/Loader/loader'
import classes from './FetchRequester.module.css'
class FetchOxygenRequester extends Component{
    state = {
        dealerDetails :null,
        currentPage:1,
        noOfRecordsPerPage:6            

    }
    componentDidMount(){
       this.props.getAllReqList()
       
    }

    
    getDealersRecord = (data) =>{
       return data ? data.map( e =>{
            return (<OxygenRequest key={e.id} details={e}> </OxygenRequest>)
        }) : null
    }
    
    paginationHandler = (number)=>{
    
         this.setState({
             currentPage:number
        })
    }
    

    render(){
        let reqList = this.props.oxygenRequestList ?  [...this.props.oxygenRequestList]:[];
        let displayReq = this.props.loading ? <Loader/> : null;
        if(reqList.length>0){
           const lastIndex =  this.state.currentPage* this.state.noOfRecordsPerPage; 
           const firstIndex =  lastIndex - this.state.noOfRecordsPerPage ;
           const pageDealers = reqList.slice(firstIndex,lastIndex)
           displayReq = this.getDealersRecord(pageDealers); 
        }
        
       return( 
        <div className="container">
          <div className={classes.topClass}> <strong> Requests</strong></div>   
            <div className="row">
                {displayReq}
            </div>
         <Pagination pagination={this.paginationHandler}  totalRecords={reqList.length} recordsPerPage={this.state.noOfRecordsPerPage} /> 
        </div>)
    }

}

const mapStatesToProps  = (state) =>{
    return{
        loading:state.oxygenRequestReducer.loading,
        oxygenRequestList:state.oxygenRequestReducer.oxygenRequestList
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getAllReqList : () => dispatch(orgAction.fetchOxygenReq({}))
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(FetchOxygenRequester);
