import React,{Component} from 'react';
import Donar from './Donar/Donar'
import {connect} from 'react-redux'
import * as orgAction from '../../store/actions/index'
import Pagination from '../../UI/Pagination/Pagination'
import Loader from '../../UI/Loader/loader'
import {} from '../../FirebaseDb/firebase'
import classes from './fetchPlasmaDonars.module.css';
class FetchPlasmaDonars extends Component{
    state = {
        donarDetails :null,
        currentPage:1,
        noOfRecordsPerPage:6,
        listCount:0        
    }
    componentDidMount(){
         this.props.getAllDonarDetails()
    }    

    getDonarsRecord = (data) =>{
       return data ? data.map( e =>{
            return (<Donar key={e.id}details={e}> </Donar>)
        }) : null
    }
    
    paginationHandler = (number)=>{
         this.setState({
             currentPage:number
        })
    }

    render(){
        let donarsList = this.props.donarList ?  [...this.props.donarList]:[];
        let displayDonars = this.props.loading ? <Loader/> : null;
        if(donarsList.length>0){
           const lastIndex =  this.state.currentPage* this.state.noOfRecordsPerPage; 
           const firstIndex =  lastIndex - this.state.noOfRecordsPerPage ;
           const pageDonars = donarsList.slice(firstIndex,lastIndex)
           displayDonars = this.getDonarsRecord(pageDonars); 
        }
        
       return( 
        <div className="container">
            <div className={classes.topClass}> <strong> Donors</strong></div>
            <div className="row">
                {displayDonars}
            </div>
         <Pagination pagination={this.paginationHandler}  totalRecords={donarsList.length} recordsPerPage={this.state.noOfRecordsPerPage} /> 
        </div>)
    }

}

const mapStatesToProps  = (state) =>{
    return{
        loading:state.plasmaDonarReducer.loading,
        donarList:state.plasmaDonarReducer.donarList
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getAllDonarDetails : () => dispatch(orgAction.fetchDonarData({}))
    }
}

export default connect(mapStatesToProps,mapDispatchToProps)(FetchPlasmaDonars);
