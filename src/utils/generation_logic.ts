import { IState, Resource, ResourceEnumStringToResource } from "./types";

// getGeneratedState returns the updated state after a generation phase. 
// This assumes the originalState passes validation. If the originalState
// is not valid, we just return the originalState.
export function getGeneratedState(originalState: IState) : IState {
    if (!validateStateForGeneration(originalState)) {
        // Return the original state if the original state wasn't valid.
        return originalState;
    }

    const {resourceReducer: originalResourceState} = originalState;
    const resourceStateAfterGeneration = {
        [Resource.TerraformingRating]: originalResourceState['0'],
        [Resource.Megacredits]: originalResourceState['1'],
        [Resource.Steel]: originalResourceState['2'],
        [Resource.Titanium]: originalResourceState['3'],
        [Resource.Plants]: originalResourceState['4'],
        [Resource.Energy]: originalResourceState['5'],
        [Resource.Heat]: originalResourceState['6'],
    };

    for (const [resourceTypeStr, originalAmounts] of Object.entries(originalResourceState)) {
        const {value, production} = originalAmounts;

        const resourceType = ResourceEnumStringToResource[resourceTypeStr];
        
        // We don't 'generate' TerraformingRating, so skip this update.
        if (resourceType === Resource.TerraformingRating) {
            continue;
        }

        if (resourceType === Resource.Megacredits) {
            // Megacredits count is increased by (TR + Megacredit production).
            resourceStateAfterGeneration[resourceType] = {
                value: value + production + originalResourceState['0'].production,
                production: production,
            }
        } else if (resourceType === Resource.Heat) {
            // Heat is increased by (previous Energy value + Heat production).
            resourceStateAfterGeneration[resourceType] = {
                value: value + production + originalResourceState['5'].value,
                production: production,
            }
        } else if (resourceType === Resource.Energy) {
            // Energy value is re-set to 0 (converted to Heat), then increased by the Energy production.
            resourceStateAfterGeneration[resourceType] = {
                value: production,
                production: production,
            }
        } else {
            // All other resources are increased only its production.
            resourceStateAfterGeneration[resourceType] = {
                value: value + production,
                production: production,
            }
        }
    }


    return {resourceReducer: resourceStateAfterGeneration};
}


// validateStateForGeneration returns true if the provided state
// will result in a valid generation phase, and false otherwise. 
export function validateStateForGeneration(state: IState): boolean {
    if (!state || !state.resourceReducer) {
        return false;
    }

    const {resourceReducer: resourceState } = state;
    for (const [resourceType, amounts] of Object.entries(resourceState)) {
        if (!ResourceEnumStringToResource.hasOwnProperty(resourceType)) {
            // There's an invalid Resource type key.
            return false;
        }

        const {value, production} = amounts;
        if (value < 0) {
            // Value can never be negative.
            return false;
        }

        if (ResourceEnumStringToResource[resourceType] === Resource.Megacredits) {
            if (production < -5) {
                // Minimum production for Megacredits is -5.
                return false;
            }
        } else if (production < 0) {
            // Minimum production for all non-Megacredits resources is 0.
            return false;
        }
    }

    return true;
}