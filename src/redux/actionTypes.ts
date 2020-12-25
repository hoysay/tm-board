import { ResourceAmount } from "../utils/types";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

interface IncrementAction {
    type: typeof INCREMENT,
    payload: ResourceAmount
}
  
interface DecrementAction {
    type: typeof DECREMENT,
    payload: ResourceAmount
}
  
  export type ResourceChangeActionTypes = IncrementAction | DecrementAction