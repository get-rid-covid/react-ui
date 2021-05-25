import React,{Component} from 'react';
import Dealer from './Dealer/Dealer'
import {connect} from 'react-redux'
import * as orgAction from '../../store/actions/index'
import Pagination from '../../UI/Pagination/Pagination'
import Loader from '../../UI/Loader/loader'
import {} from '../../FirebaseDb/firebase'
import classes from './FetchOxygenDealers.module.css';
class FetchOxygenDealers extends Component{
    state = {
        dealerDetails :null,
        currentPage:1,
        noOfRecordsPerPage:6,
        listCount:0        
    }
    componentDidMount(){
         this.props.getAllDealerDetails()
    }    

    getDealersRecord = (data) =>{
       return data ? data.map( e =>{
            return (<Dealer key={e.id}details={e}> </Dealer>)
        }) : null
    }
    
    paginationHandler = (number)=>{
         this.setState({
             currentPage:number
        })
    }

    render(){
        let dealerList = this.props.dealerList ?  [...this.props.dealerList]:[];
        let displayDealers = this.props.loading ? <Loader/> : null;
        if(dealerList.length>0){
           const lastIndex =  this.state.currentPage* this.state.noOfRecordsPerPage; 
           const firstIndex =  lastIndex - this.state.noOfRecordsPerPage ;
           const pageDealers = dealerList.slice(firstIndex,lastIndex)
           displayDealers = this.getDealersRecord(pageDealers); 
        }
        
       return( 
        <div className="container">
            <div className={classes.topClass}> <strong> Dealers</strong></div>
            <div className="row">
                {displayDealers}
            </div>
         <Pagination pagination={this.paginationHandler}  totalRecords={dealerList.length} recordsPerPage={this.state.noOfRecordsPerPage} /> 
        </div>)
    }

}

const mapStatesToProps  = (state) =>{
    return{
        loading:state.oxygenDetailReducer.loading,
        dealerList:state.oxygenDetailReducer.dealerList
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getAllDealerDetails : () => dispatch(orgAction.fetchDealerData({}))
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(FetchOxygenDealers);
