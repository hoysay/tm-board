import { INCREMENT, DECREMENT, ResourceChangeActionTypes } from "../actionTypes";

const initialState = {
    allIds: [],
    byIds: {}
  };

export default function resourceReducer(state = initialState, action: ResourceChangeActionTypes) {
    switch (action.type) {
        case INCREMENT: {
            return {
                ...state
            }
        }
        case DECREMENT: {
            return {
                ...state
            }
        }
        default:
            return state;
    }

}