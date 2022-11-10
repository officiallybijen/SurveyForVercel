import { ADD_RESULT } from "../constants"

const resultReducer = (state = [], action) => {
    switch(action.type) {
        case ADD_RESULT:
            return [...state, action.payload]
        default:
            return state
    }
}

export default resultReducer