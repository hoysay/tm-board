import { INCREMENT, DECREMENT, ResourceChangeActionTypes } from "../actionTypes";
import { Amounts, IResourceState, Resource } from "../../utils/types";

const initialAmounts: Amounts = {
    value: 0,
    production: 0
}

const initialState: IResourceState  = {
    [Resource.TerraformingRating]: initialAmounts,
    [Resource.Megacredits]: initialAmounts,
    [Resource.Steel]: initialAmounts,
    [Resource.Titanium]: initialAmounts,
    [Resource.Plants]: initialAmounts,
    [Resource.Energy]: initialAmounts,
    [Resource.Heat]: initialAmounts
};

export default function resourceReducer(state: IResourceState = initialState, action: ResourceChangeActionTypes) {
    switch (action.type) {
        case INCREMENT: {
            const { resource, amount } = action.payload;
            const { value, production } = state[resource];
            const newState = {
                ...state,
                [resource]: {
                    production: production + amount,
                    value: value
                }
            };
            console.log("state: ", newState);
            return newState;
        }
        case DECREMENT: {
            console.log("reducer decrement");
            return {
                ...state
            }
        }
        default:
            return state;
    }

}