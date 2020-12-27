export enum Resource {
    TerraformingRating,
    Megacredits,
    Steel,
    Titanium,
    Plants,
    Energy,
    Heat
}

export const ResourceToLabel = {
    [Resource.TerraformingRating]: "Terraforming Rating",
    [Resource.Megacredits]: "Megacredits",
    [Resource.Steel]: "Steel",
    [Resource.Titanium]: "Titanium",
    [Resource.Plants]: "Plants",
    [Resource.Energy]: "Energy",
    [Resource.Heat]: "Heat",
}

export const ResourceEnumStringToResource: Record<string, Resource> = {
    '0': Resource.TerraformingRating,
    '1': Resource.Megacredits,
    '2': Resource.Steel,
    '3': Resource.Titanium,
    '4': Resource.Plants,
    '5': Resource.Energy,
    '6': Resource.Heat,
}

// ResourceAmount used as argument for increment/decrement actions.
export interface ResourceAmount {
    resource: Resource,
    value: number,
    production: number
}

export interface Amounts {
    value: number,
    production: number
}

export interface IState {
    resourceReducer: IResourceState
}

export interface IResourceState {
    [Resource.TerraformingRating]: Amounts,
    [Resource.Megacredits]: Amounts,
    [Resource.Steel]: Amounts,
    [Resource.Titanium]: Amounts,
    [Resource.Plants]: Amounts,
    [Resource.Energy]: Amounts,
    [Resource.Heat]: Amounts
}

