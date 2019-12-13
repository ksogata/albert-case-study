import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Search.css';
import { fetchSearchResults } from '../actions';

const Search = () => {
    const [query, changeQuery] = useState('');
    const [page, changePage] = useState(1);
    const [start, changeStart] = useState(0);
    const timeoutRef = useRef(null);
    const INCREMENT = 20;

    const results = useSelector(state => state.results);
    const loading = useSelector(state => state.loading);
    const reqInfo = useSelector(state => state.requestInfo);
    
    const dispatch = useDispatch();


    // using timeout to dispatch after user stops typing rather than on every input change
    useEffect(() => {
        if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
        if (query) {
            timeoutRef.current = setTimeout(() => {
                timeoutRef.current = null;
                dispatch(fetchSearchResults(query, page));
            }, 800);
        }
    }, [dispatch, query, page]);

    const handlePageClick = (type) => {
        const newStart = 'prev' === type ? start - INCREMENT : start + INCREMENT;
        changeStart(newStart);

        if (newStart >= 100) {
            changePage(prevPage => prevPage + 1);
            changeStart(0);
        }

        if (newStart < 0) {
            changePage(prevPage => prevPage - 1);
            changeStart(100-INCREMENT);
        }
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
                    onChange={(e) => changeQuery(e.target.value)}
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
            { reqInfo && <p>{reqInfo.total_results}</p>}
            {
                query && results ?
                <div className='results-container'>
                    {results.filter(result => result.edition_count > 0).slice(start, start + INCREMENT).map((result) => 
                        <div className='result-items' key={result.key}>
                            <div className='image-username'>
                                <p>{result.title}</p>
                                {result.author_name && <p>By: {result.author_name}</p>}
                            
                            </div>
                            <div className='image-wrapper'>
                                <img className='image' alt={`${result.title}`} src={`http://covers.openlibrary.org/b/id/${result.cover_i}-M.jpg`} />
                            </div>
                        </div>
                    )}
                </div> :
                <div>No Search Results.</div>
            }
        </div>
    )
}

export default Search;