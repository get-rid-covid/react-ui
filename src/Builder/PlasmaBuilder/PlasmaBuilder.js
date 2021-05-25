import React,{Component} from 'react'
import FetchPlasmaDonars from '../../component/FetchDonarsList/fetchPlasmaDonars'
import FetchRequester from '../../component/FetchPlasmReqList/fetchPlasmaReqList'
import classes from './PlasmaBuilder.module.css'

class PlasmaBuilder extends Component{
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
    render(){
        let donarReqFetch = <FetchRequester/>;
        if(this.state.isDonar){
            donarReqFetch = <FetchPlasmaDonars/>
        }
        return(
            <div>
            <div className={classes.toggleClass}>
                    <div className={["btn-group", classes.externaBtnClass].join(' ')} data-toggle="button" role="group" aria-label="Basic example">
                    <button type="button"  className={this.state.isDonar ? "btn btn-primary" : "btn btn-secondary"} onClick={this.toggleDonarHandler} > Donors</button>
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

export default PlasmaBuilder