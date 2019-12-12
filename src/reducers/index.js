const initialState = {
    results: null,
    loading: false,
    requestInfo: {}
}

const getPagesCount = (total, denominator) => {
    const divisible = total % denominator === 0;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
}

const updateObject = (oldObject, updatedValues) => {
    return Object.assign({}, oldObject, updatedValues);
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SEARCH_START':
            return updateObject(state, { loading: true });
        case 'SEARCH_FAIL':
            return updateObject(state, { loading: false });
        case 'SEARCH_SUCCESS':
            const { hits, total } = action.data;
            const total_pages = getPagesCount(total, 20);
            const page = action.page;

            return updateObject(state, {
                results: hits,
                requestInfo: {
                    page,
                    total_pages,
                    total_results: total,
                    isLastPage: page >= total_pages ? true : false,
                },
                loading: false,
            });
        default:
            return state;
    }
};

export default reducer;