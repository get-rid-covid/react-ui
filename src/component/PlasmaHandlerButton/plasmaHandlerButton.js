import Button from '../../UI/Button/Button'
import classes from './plasmaHandlerButton.module.css'
import PlasmaFilter from '../PlasmaFilter/PlasmaFilter'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import * as labi from '../../utils/Constants/EnglishLabels'

const openPlasmaModals = (props) =>{
    return(
        <div className={classes.OpenPlasmaModal}>
            {/* <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-6 col-4">
                    <Button btnType="btn btn-info" clicked={props.clickDonar}>Donar Registeration</Button>
                </div>
                <div className="col-md-4 col-sm-3 col-xs-3 col-3">
                    <Button btnType="btn btn-info" clicked={props.clickRequest}> Rise a Request </Button>
                </div>
                 <div className="col-md-4 col-sm-3 col-3">
                    <Button btnType="btn btn-info" clicked={props.clickDeactivate}> Deactivate Record </Button>
                </div> 
            </div> */}
            <div className="btn-group" data-toggle="button" role="group" aria-label="Basic example">
                <button type="button" onClick={props.firstClick} className="btn btn-dark" >{props.firstLabel}</button>
                <button type="button" onClick={props.secondClick} className="btn btn-secondary">{props.secondLabel}</button>
                <button type="button" onClick={props.thirdClick} className="btn btn-dark" >{props.thirdLabel}</button>
            </div>
            {/* <div className={classes.filterClass} >
                <div className={classes.headerClass}>
                    <strong> {labi.FILTER} </strong>
                    <div className={classes.toggleButton}>
                    <BootstrapSwitchButton
                            
                            //  checked = {this.state.isFilterOn}
                            offstyle='secondary'
                            onlabel='On'
                            offlabel='Off'
                            //  onChange ={this.toggleDonarHandler}
                        />
    
                    </div>
                </div>  
                <PlasmaFilter/>
            </div> */}
        </div>


    )
}
export default openPlasmaModals;