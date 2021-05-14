import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary/Auxilary'
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component{
    render(){
        return(
            <Aux>
                 <Backdrop clicked={this.props.modalClosed} show={this.props.show} /> 
                <div className={[classes.Modal].join(' ')} 
                 style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity: this.props.show? 1:0,
                     height : this.props.giveFormHeight ? '80%':'auto' }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}  

export default Modal;



