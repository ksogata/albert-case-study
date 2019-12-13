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