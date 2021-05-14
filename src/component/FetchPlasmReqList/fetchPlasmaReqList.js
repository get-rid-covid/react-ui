import React,{Component} from 'react';
import Requester from './Requester/requester'
import {connect} from 'react-redux'
import * as orgAction from '../../store/actions/index'
import Pagination from '../../UI/Pagination/Pagination'
import Loader from '../../UI/Loader/loader'
import classes from './fetchPlasmaReqList.module.css'
class FetchPlasmaReq extends Component{
    state = {
        donarDetails :null,
        currentPage:1,
        noOfRecordsPerPage:6            

    }
    componentDidMount(){
       this.props.getAllReqList()
       
    }

    
    getDonarsRecord = (data) =>{
       return data ? data.map( e =>{
            return (<Requester key={e.id} details={e}> </Requester>)
        }) : null
    }
    
    paginationHandler = (number)=>{
    
         this.setState({
             currentPage:number
        })
    }
    

    render(){
        let reqList = this.props.plasmaRequestList ?  [...this.props.plasmaRequestList]:[];
        let displayReq = this.props.loading ? <Loader/> : null;
        if(reqList.length>0){
           const lastIndex =  this.state.currentPage* this.state.noOfRecordsPerPage; 
           const firstIndex =  lastIndex - this.state.noOfRecordsPerPage ;
           const pageDonars = reqList.slice(firstIndex,lastIndex)
           displayReq = this.getDonarsRecord(pageDonars); 
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
        loading:state.plasmaReqReducer.loading,
        plasmaRequestList:state.plasmaReqReducer.plasmaRequestList
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getAllReqList : () => dispatch(orgAction.fetchPlasmaReq({}))
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(FetchPlasmaReq);
