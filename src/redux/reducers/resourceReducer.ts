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
            const { resource, value: inc_value, production: inc_production } = action.payload;
            const { value: current_value, production: current_production } = state[resource];
            const newState = {
                ...state,
                [resource]: {
                    production: current_production + inc_production,
                    value: current_value + inc_value
                }
            };
            console.log("state: ", newState);
            return newState;
        }
        case DECREMENT: {
            const { resource, value: dec_value, production: dec_production } = action.payload;
            const { value: current_value, production: current_production } = state[resource];
            const newState = {
                ...state,
                [resource]: {
                    production: current_production - dec_production,
                    value: current_value - dec_value
                }
            };
            console.log("state: ", newState);
            return newState;
        }
        default:
            return state;
    }

}