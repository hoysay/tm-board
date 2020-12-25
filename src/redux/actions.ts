import { INCREMENT, DECREMENT } from "./actionTypes";
import { ResourceChange } from "../utils/types";

export const increment = (payload: ResourceChange) => ({
    type: INCREMENT,
    payload: { payload }
  });

  export const decrement = (payload: ResourceChange) => ({
    type: DECREMENT,
    payload: { payload}
  });