import { Amounts, Resource, IState } from "./types";
import {getGeneratedState, validateStateForGeneration} from "./generation_logic";

const emptyAmounts: Amounts = {
    value: 0,
    production: 0,
}

const emptyResourceState: IState = {
    resourceReducer: {
        [Resource.TerraformingRating]: emptyAmounts,
        [Resource.Megacredits]: emptyAmounts,
        [Resource.Steel]: emptyAmounts,
        [Resource.Titanium]: emptyAmounts,
        [Resource.Plants]: emptyAmounts,
        [Resource.Energy]: emptyAmounts,
        [Resource.Heat]: emptyAmounts
    }
}

test("test validate function", () => {
    interface TestCase {
        description: string;
        inputResourceState: IState;
        expectedResult: boolean;
    }
    const testCases: Array<TestCase> = [
        {
            description: "When all resources are 0, validate returns true",
            inputResourceState: emptyResourceState,
            expectedResult: true
        },
        {
            description: "When a non-Megacredits production is negative, validate returns false",
            inputResourceState: {
                resourceReducer: {
                    [Resource.TerraformingRating]: emptyAmounts,
                    [Resource.Megacredits]: emptyAmounts,
                    [Resource.Steel]: emptyAmounts,
                    [Resource.Titanium]: {
                        value: 0,
                        production: -1,
                    },
                    [Resource.Plants]: emptyAmounts,
                    [Resource.Energy]: emptyAmounts,
                    [Resource.Heat]: emptyAmounts
                }
            },
            expectedResult: false
        },
        {
            description: "When Megacredits production is below -5, validate returns false",
            inputResourceState: {
                resourceReducer: {
                    [Resource.TerraformingRating]: emptyAmounts,
                    [Resource.Megacredits]: {
                        value: 0,
                        production: -6,
                    },
                    [Resource.Steel]: emptyAmounts,
                    [Resource.Titanium]: emptyAmounts,
                    [Resource.Plants]: emptyAmounts,
                    [Resource.Energy]: emptyAmounts,
                    [Resource.Heat]: emptyAmounts
                }
            },
            expectedResult: false
        },
        {
            description: "When all values/production are at minimum, validate returns true",
            inputResourceState: {
                resourceReducer: {
                    [Resource.TerraformingRating]: emptyAmounts,
                    [Resource.Megacredits]: {
                        value: 0,
                        production: -5,
                    },
                    [Resource.Steel]: emptyAmounts,
                    [Resource.Titanium]: emptyAmounts,
                    [Resource.Plants]: emptyAmounts,
                    [Resource.Energy]: emptyAmounts,
                    [Resource.Heat]: emptyAmounts
                }
            },
            expectedResult: true
        },       
        {
            description: "When any value is negative, validate returns false",
            inputResourceState: {
                resourceReducer: {
                    [Resource.TerraformingRating]: emptyAmounts,
                    [Resource.Megacredits]: {
                        value: 0,
                        production: -5,
                    },
                    [Resource.Steel]: emptyAmounts,
                    [Resource.Titanium]: emptyAmounts,
                    [Resource.Plants]: emptyAmounts,
                    [Resource.Energy]: emptyAmounts,
                    [Resource.Heat]: {
                        value: -1,
                        production: 10,
                    }
                }
            },
            expectedResult: false
        },
    ]

    testCases.forEach(tc => {
        const validateResult = validateStateForGeneration(tc.inputResourceState);
        expect(validateResult).toBe(tc.expectedResult);
    })
})


test("test generate function", () => {
    interface TestCase {
        description: string;
        inputResourceState: IState;
        expectedResult: IState;
    }
    const testCases: Array<TestCase> = [
        {
            description: "When all resources are 0, generate returns original state",
            inputResourceState: emptyResourceState,
            expectedResult: emptyResourceState,
        },
        {
            description: "Handles Megacredit update correctly",
            inputResourceState: {
                resourceReducer: {
                    [Resource.TerraformingRating]: {
                        value: 0,
                        production: 11,
                    },
                    [Resource.Megacredits]: {
                        value: 4,
                        production: -1,
                    },
                    [Resource.Steel]: emptyAmounts,
                    [Resource.Titanium]: emptyAmounts,
                    [Resource.Plants]: emptyAmounts,
                    [Resource.Energy]: emptyAmounts,
                    [Resource.Heat]: emptyAmounts,
                }
            },
            expectedResult: {
                resourceReducer: {
                    [Resource.TerraformingRating]: {
                        value: 0,
                        production: 11,
                    },
                    [Resource.Megacredits]: {
                        value: 14, // 4 original, +11 from TR, -1 from Megacredit production.
                        production: -1,
                    },
                    [Resource.Steel]: emptyAmounts,
                    [Resource.Titanium]: emptyAmounts,
                    [Resource.Plants]: emptyAmounts,
                    [Resource.Energy]: emptyAmounts,
                    [Resource.Heat]: emptyAmounts,
                }
            },
        },
        {
            description: "Handles Energy/heat conversions & updates correctly",
            inputResourceState: {
                resourceReducer: {
                    [Resource.TerraformingRating]: emptyAmounts,
                    [Resource.Megacredits]: emptyAmounts,
                    [Resource.Steel]: emptyAmounts,
                    [Resource.Titanium]: emptyAmounts,
                    [Resource.Plants]: emptyAmounts,
                    [Resource.Energy]: {
                        value: 3, 
                        production: 5,
                    },
                    [Resource.Heat]: {
                        value: 4,
                        production: 1,
                    },
                }
            },
            expectedResult: {
                resourceReducer: {
                    [Resource.TerraformingRating]: emptyAmounts,
                    [Resource.Megacredits]: emptyAmounts,
                    [Resource.Steel]: emptyAmounts,
                    [Resource.Titanium]: emptyAmounts,
                    [Resource.Plants]: emptyAmounts,
                    [Resource.Energy]: {
                        value: 5, // The previous 3 Energy got converted to heat.
                        production: 5,
                    },
                    [Resource.Heat]: {
                        value: 8, // 4 original, +3 from Energy conversion, +1 from normal Heat production.
                        production: 1,
                    },
                }
            },
        },
        {
            description: "Handles all updates correctly",
            inputResourceState: {
                resourceReducer: {
                    [Resource.TerraformingRating]: {
                        value: 0,
                        production: 20,
                    },
                    [Resource.Megacredits]: {
                        value: 10,
                        production: 10,
                    },
                    [Resource.Steel]: {
                        value: 2,
                        production: 3,
                    },
                    [Resource.Titanium]: {
                        value: 1,
                        production: 3,
                    },
                    [Resource.Plants]: {
                        value: 4,
                        production: 23,
                    },
                    [Resource.Energy]: {
                        value: 2, 
                        production: 8,
                    },
                    [Resource.Heat]: {
                        value: 1,
                        production: 1,
                    },
                }
            },
            expectedResult: {
                resourceReducer: {
                    [Resource.TerraformingRating]: {
                        value: 0,
                        production: 20,
                    },
                    [Resource.Megacredits]: {
                        value: 40,
                        production: 10,
                    },
                    [Resource.Steel]: {
                        value: 5,
                        production: 3,
                    },
                    [Resource.Titanium]: {
                        value: 4,
                        production: 3,
                    },
                    [Resource.Plants]: {
                        value: 27,
                        production: 23,
                    },
                    [Resource.Energy]: {
                        value: 8, // The previous 2 Energy got converted to heat.
                        production: 8,
                    },
                    [Resource.Heat]: {
                        value: 4, 
                        production: 1,
                    },
                }
            },
        },
    ]

    testCases.forEach(tc => {
        const validateResult = getGeneratedState(tc.inputResourceState);

        expect(validateResult).toStrictEqual(tc.expectedResult);
    })
})

export {}