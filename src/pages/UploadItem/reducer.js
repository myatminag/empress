export const uploadItemReducer = (state, action) => {
    switch (action.type) {
        case "REQUEST_CREATE_ITEM":
            return {
                ...state,
                loadingCreate: true,
            }
        case "SUCCESS_CREATE_ITEM": 
            return {
                ...state,
                loadingCreate: false
            }
        case "FAIL_CREATE_ITEM":
            return {
                ...state,
                loadingCreate: false 
            }
        case "REQUEST_UPLOAD":
            return {
                ...state,
                loadingUpload: true,
                errorUpload:''
            }
        case "SUCCESS_UPLOAD":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: ''
            }
        case "FAIL_UPLOAD":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: action.payload
            }
        default:
            return state;
    }
};