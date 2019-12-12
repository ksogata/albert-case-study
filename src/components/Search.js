import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Search.css';
import { fetchSearchResults } from '../actions';

const Search = () => {
    const [query, changeQuery] = useState('');
    const [page, changePage] = useState(1);

    const results = useSelector(state => state.results);
    const loading = useSelector(state => state.loading);
    
    const dispatch = useDispatch();

    const search = (query, page) => dispatch(fetchSearchResults(query, page));

    const handleOnInputChange = event => {
        const newQuery = event.target.value;
        changeQuery(newQuery);
        search(newQuery, 1);
    }

    const handlePageClick = (type) => {
        const updatedPageNo = 'prev' === type ? page - 1 : page + 1;
        changePage(updatedPageNo);
        dispatch(fetchSearchResults(query, updatedPageNo));
    }

    return (
        <div className='container'>
            <h2 className='heading'>Live Search</h2>
            <label className='search-label' htmlFor='search-input'>
                <input
                    type='text'
                    value={query}
                    id='search-input'
                    placeholder='Search...'
                    onChange={handleOnInputChange}
                />
                <i className='fa fa-search search-icon' />
            </label>
            <div className="nav-link-container">
                <button onClick={() => handlePageClick('prev')}>
                    Prev
                </button>
                <button onClick={() => handlePageClick('next')}>
                    Next
                </button>
            </div>
            {
                results ?
                <div className='results-container'>
                    {results.map((result) => {
                        return (
                            <a key={result.id} href={result.previewURL} className='result-items'>
                                <h6 className='image-username'>{result.user}</h6>
                                <div className='image-wrapper'>
                                    <img className='image' src={result.previewURL} alt={result.user} />
                                </div>
                            </a>
                        );
                    })}
                </div> :
                <div>No Search Results.</div>
            }
        </div>
    )
}

export default Search;