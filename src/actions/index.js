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
    let call;

    return dispatch => {
        if (call) {
            call.cancel();
        }

        dispatch(searchStart());
        call = axios.CancelToken.source();

        const searchUrl = `https://pixabay.com/api/?key=14573046-82ba50bd51be4bc29499ebf18&q=${encodeURI(query)}&page=${page}`;
        return axios(searchUrl, {
            cancelToken: call.token
        })
        .then((res) => {
            console.log(res);
            dispatch(searchSuccess(res.data, page));
        })
        .catch(error => {
            dispatch(searchFail());
            if (axios.isCancel(error) || error) {
                console.error(error.message);
            }
        });
    };
}

