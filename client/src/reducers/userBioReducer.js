const SET_BIO = "SET_BIO"


const defaultState = {
    currentBio: {},
}

export default function userBioReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_BIO:
            return {
                ...state,
                currentBio: action.payload
            }
        default:
            return state
    }
}

export const setBio = bio => ({type: SET_BIO, payload: bio})