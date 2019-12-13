import React, {
    useState,
    useRef,
    useEffect
} from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import '../stylesheets/App.css';
import {
    fetchSearchResults
} from '../utils';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Searchbar from './Searchbar';
import Pagination from './Pagination';
import Books from './Books';

const App = () => {
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
            changeStart(100 - INCREMENT);
        }
    }

    const handleInputChange = (e) => {
        changeQuery(e.target.value);
        changeStart(0);
    }

    return (
        <div className='search-container'>
            <Searchbar query={query} handleInputChange={handleInputChange} reqInfo={reqInfo}/>

            <Pagination page={page} start={start} reqInfo={reqInfo} handlePageClick={handlePageClick} INCREMENT={INCREMENT}/>
            {
                !!loading ? 
                    <Loader type="MutatingDots" color="#00BFFF" height={80} width={80} /> :
                    !!results ?
                        <Books books={results} start={start} end={start + INCREMENT} /> :
                        <div>No Search Results.</div>
            }
        </div>
    )
}

export default App;