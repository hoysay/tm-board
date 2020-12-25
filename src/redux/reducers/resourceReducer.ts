import { INCREMENT, DECREMENT, ResourceChangeActionTypes } from "../actionTypes";
import { Resource } from "../../utils/types";

interface Amounts {
    value: number,
    production: number
}

const initialAmounts: Amounts = {
    value: 0,
    production: 0
}

interface IState {
    [Resource.TerraformingRating]: Amounts,
    [Resource.Megacredits]: Amounts,
    [Resource.Steel]: Amounts,
    [Resource.Titanium]: Amounts,
    [Resource.Plants]: Amounts,
    [Resource.Energy]: Amounts,
    [Resource.Heat]: Amounts
}

const initialState: IState  = {
    [Resource.TerraformingRating]: initialAmounts,
    [Resource.Megacredits]: initialAmounts,
    [Resource.Steel]: initialAmounts,
    [Resource.Titanium]: initialAmounts,
    [Resource.Plants]: initialAmounts,
    [Resource.Energy]: initialAmounts,
    [Resource.Heat]: initialAmounts
};

export default function resourceReducer(state: IState = initialState, action: ResourceChangeActionTypes) {
    switch (action.type) {
        case INCREMENT: {
            console.log("reducer increment");
            const { resource, amount } = action.payload;
            const { value, production } = state[resource];
            console.log("new production: " + production + " value: " + value);
            return {
                ...state,
                [resource]: {
                    production: production + amount,
                    value: value
                }
            }
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