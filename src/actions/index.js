import axios from 'axios';

export const searchStart = () => {
    return {
        type: 'SEARCH_START'
    };
};

export const searchFail = () => {
    return {
        type: 'SEARCH_FAIL'
    };
};

export const searchSuccess = (data, page) => {
    return {
        type: 'SEARCH_SUCCESS',
        data,
        page
    };
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
        console.log(searchUrl);
        try {
            const res = await axios(searchUrl, {
                cancelToken: call.token
            });
            // console.log(res);
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

