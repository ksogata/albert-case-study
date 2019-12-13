import axios from 'axios';
import { searchStart, searchFail, searchSuccess } from '../actions';

export const getPagesCount = (total, denominator) => {
    const extraPage = total % denominator === 0 ? 0 : 1;
    return Math.floor(total / denominator) + extraPage;
};

export const fetchSearchResults = (query, page) => {
    // using axios cancel token to prevent an overload of requests
    let call;

    return async dispatch => {
        if (call) {
            call.cancel();
        }

        dispatch(searchStart());
        call = axios.CancelToken.source();

        const BASE_URL = `https://openlibrary.org/search.json`;

        const searchUrl = `${BASE_URL}?q=${encodeURI(query)}&page=${page}&mode=ebooks&has_fulltext=true`;
        try {
            const res = await axios(searchUrl, {
                cancelToken: call.token
            });
            dispatch(searchSuccess(res.data, page));
        }
        catch (error) {
            dispatch(searchFail());
            if (axios.isCancel(error) || error) {
                console.error(error.message);
            }
        }
    };
}