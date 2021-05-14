import React from 'react';

const Pagination = (props) =>{
      const noOfPages = Math.ceil(props.totalRecords/props.recordsPerPage);
      let pageNumber = []
      for(let i=1; i<=noOfPages; i++){
        pageNumber.push(i);
      }
      const getPagination = (number) =>{
        

        props.pagination(number)
      }
      return(
        <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                  {pageNumber.map(number =>{
                      return(
                        <li className="page-item"key={number}>
                            <a className="page-link" onClick={()=>{getPagination(number)}}>
                                {number}
                            </a>
                        </li>  
                      )
                  })}
              

              </ul>
        </nav>)
}

export default Pagination;