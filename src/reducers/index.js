import { getPagesCount } from '../utils';

const initialState = {
    results: null,
    loading: false,
    requestInfo: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SEARCH_START':
            return { 
                ...state,
                loading: true 
            };
        case 'SEARCH_FAIL':
            return { 
                ...state,
                loading: false 
            };
        case 'SEARCH_SUCCESS':
            const { docs, numFound } = action.data;
            // openlibrary gets results in chunks of 100, so page contains 100 results
            const total_pages = getPagesCount(numFound, 100);
            const page = action.page;

            return {
                ...state,
                results: docs,
                requestInfo: {
                    page,
                    total_pages,
                    total_results: numFound,
                    isLastPage: page >= total_pages ? true : false,
                },
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;