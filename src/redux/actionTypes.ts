import { ResourceAmount } from "../utils/types";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const GENERATE = "GENERATE";

interface IncrementAction {
    type: typeof INCREMENT,
    payload: ResourceAmount
}
  
interface DecrementAction {
    type: typeof DECREMENT,
    payload: ResourceAmount
}

interface GenerateAction {
    type: typeof GENERATE,
    payload: {},
}
  
  export type ResourceChangeActionTypes = IncrementAction | DecrementAction | GenerateAction;