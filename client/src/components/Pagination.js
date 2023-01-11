import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

const Pagination = ({ info}) => {
    const [firstPageNumber, setFirstPage] = useState(0)
    const [lastPageNumber, setLastPage] = useState(10)
    const numberOfAllPages = info?.pages
    const allPages = []
    for (let i = 1; i <= numberOfAllPages; i++) {
        allPages.push(i)
    }

    function handleClick(page){
        setFirstPage(page -6)
        if (page < 6) {
            setFirstPage(0)
        }
        setLastPage(page + 5)
        if (lastPageNumber > numberOfAllPages && page !== 0){
            setLastPage(numberOfAllPages)
            setFirstPage(31)
        }
    }

    return (
        <div className="pagination justify-content-center">
            <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item" style={{cursor: "pointer"}}>
                    <div className="page-link" onClick={() => handleClick(0)}>First pages</div>
                </li>
                {allPages.slice(firstPageNumber, lastPageNumber).map(page =>
                        <li key={page} className="page-item active">
                            <NavLink onClick={() => handleClick(page)} to={"/page/" + page}>
                                <div className="page-link">{page}</div>
                            </NavLink>
                        </li>
                )}

                <li className="page-item" style={{cursor: "pointer"}}>
                    <div className="page-link" onClick={() => handleClick(numberOfAllPages)} >Last pages</div>
                </li>
            </ul>
            </nav>

        </div>
    );
};

export default Pagination;