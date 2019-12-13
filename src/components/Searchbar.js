import React from 'react';

const Searchbar = ({ query, handleInputChange, reqInfo }) => {
    return (
        <div>
            <h2 className='heading'>Search for a book</h2>
            <label className='search-label' htmlFor='search-input'>
                <input
                    type='text'
                    value={query}
                    id='search-input'
                    placeholder='Search...'
                    onChange={handleInputChange}
                />
                <i className='fa fa-search search-icon' />
            </label>
            { !!reqInfo && <p>Results Found: {reqInfo.total_results}</p>}
        </div>
    )
}

export default Searchbar;