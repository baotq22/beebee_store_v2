import React, { useState } from "react";
import '../App.css'

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pag'>
                {pageNumbers.map(number => (
                    <li onClick={() => paginate(number)} key={number} className='page-item'>
                        <p className='page-link'>
                            {number}
                        </p>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination