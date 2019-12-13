const initialState = {
    results: null,
    loading: false,
    requestInfo: null
}

const getPagesCount = (total, denominator) => {
    const divisible = total % denominator === 0;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
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