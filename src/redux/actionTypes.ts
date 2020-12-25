import { ResourceChange } from "../utils/types";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

interface IncrementAction {
    type: typeof INCREMENT,
    payload: ResourceChange
}
  
interface DecrementAction {
    type: typeof DECREMENT,
    payload: ResourceChange
}
  
  export type ResourceChangeActionTypes = IncrementAction | DecrementAction