import Model from '../Modal/Modal'
import Button from '../Button/Button'

import classes from './InfoModel.module.css'

const infoModel = (props) =>{
    return (
        <Model show={props.infoModel} giveFormHeight={false} >
                <p>{props.infoMessage}</p>
                <div className={classes.ButtonClass}>
                    <Button btnType="btn btn-primary" clicked={props.closeInfoModal} > Ok</Button>
                </div>
        </Model>
    )
}

export default infoModel;