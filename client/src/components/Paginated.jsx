import React from "react";
import './styles/Paginated.css'

export default function Paginated ({videogamesPerPage, allVideogames, setCurrentPage, currentPage}){
    const pageNumbers = [];

    for (let i = 0; i <= Math.ceil(allVideogames/videogamesPerPage) - 1; i++) {
        pageNumbers.push(i+1);
    }
    return(
            <div className='paginated-container'>
                <button className='button' disabled={currentPage === 1} onClick={()=> setCurrentPage(prev => --prev)}>{'<'}</button>
                <div>
                <span>Page: </span>
                <button>{currentPage}</button>
                </div>
                <button className='button' disabled={currentPage === pageNumbers.length} onClick={()=> setCurrentPage(prev => ++prev)}>{'>'}</button>
            </div>       
        

            // <nav>
            //     <ul className='paginated'>
            //         {pageNumbers?.map(number =>{
            //             return <li key={number}>
            //                         <a key={number} onClick={() => paginated(number)}>{number}</a>
            //                     </li>
            //         })}
            //     </ul>
            // </nav>
    )
}