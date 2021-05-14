import Button from '../../UI/Button/Button'
import classes from './openPlasmaModal.module.css'
const openPlasmaModals = (props) =>{
    return(
        <div className={classes.OpenPlasmaModal}>
            <div className="row">
                <div className="col-md-4 col-sm-6 col-xs-6 col-4">
                    <Button btnType="btn btn-info" clicked={props.clickDonar}>Donar Registeration</Button>
                </div>
                <div className="col-md-4 col-sm-3 col-xs-3 col-3">
                    <Button btnType="btn btn-info" clicked={props.clickRequest}> Rise a Request </Button>
                </div>
                 <div className="col-md-4 col-sm-3 col-3">
                    <Button btnType="btn btn-info" clicked={props.clickDeactivate}> Deactivate Record </Button>
                </div> 
            </div>
        </div>
    )
}
export default openPlasmaModals;