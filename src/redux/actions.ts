import { INCREMENT, DECREMENT, GENERATE } from "./actionTypes";
import { ResourceAmount } from "../utils/types";

export const increment = (payload: ResourceAmount) => ({
    type: INCREMENT,
    payload: payload
});

export const decrement = (payload: ResourceAmount) => ({
    type: DECREMENT,
    payload: payload
});

export const generate = () => ({
    type: GENERATE,
    payload: {},
})