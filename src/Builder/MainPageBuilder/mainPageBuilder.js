import React,{Component} from 'react'
import classes from './mainPageBuilder.module.css'

class MainPageBuilder extends Component{
    render(){
        return(
            <div className={classes.quotes}>
                <ul>
                    <li>
                        Get-rid-covid is supported by some committed voluteers who are trying to reach 
                        out the maximum number of dealers, hospitals and donors to keep the information authentic.
                        However we dont gurantee the 100% autenticity and we endevour to verify them through call before reaching out to them.

                    </li>
                    <li>
                        We are not involved in any monetary transaction. Please report us immediately if any one is charging anything on behalf of Get-rid-Covid.
                     </li>
                     <li>
                       To ensure privacy we have added a data privacy field during the registration. If you opt for privacy then your information would be only accessed by volunteers.    
                     </li>
                </ul>
            </div>
        )
    }
}

export default MainPageBuilder;