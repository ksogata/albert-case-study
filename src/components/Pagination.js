import React from 'react';

const Pagination = ({ page, start, reqInfo, handlePageClick, INCREMENT }) => {
    const isLastChunk = () => {
        const itemsLeft = reqInfo.total_results - ((page - 1) * 100)
        return start + INCREMENT > itemsLeft;
    }

    // show prev button only if there is a prev page and show next button only if there is a next page
    return (
        <div className="nav-link-container">
            {!(page === 1 && start === 0) &&
                <button onClick={() => handlePageClick('prev')} className='nav-link'>
                    Prev
                </button>           
            }
            {!!reqInfo && !(reqInfo.isLastPage && isLastChunk()) &&
                <button onClick={() => handlePageClick('next')} className='nav-link'>
                    Next
                </button>
            }
        </div>
    )
}

export default Pagination;