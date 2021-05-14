import React from 'react';
  

const progressBar = (props) =>{


   return(
    <div className="progress">
    <div className="progress-bar" role="progressbar" style={{width: '100%'}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">Details</div>
    <div className="progress-bar bg-success" role="progressbar" style={{width: '100%'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Transaction</div>
    <div className="progress-bar" role="progressbar" style={{width: '100%'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Confirmation</div>
  </div>
   )
}

export default progressBar;