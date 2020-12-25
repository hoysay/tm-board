import React from "react";
import { Modal, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import {Resource, ResourceToLabel} from "../../utils/types";

import "./resource_tile.css";

const ResourceToPrimaryColor = {
    [Resource.TerraformingRating]: "#bd8e2f",
    [Resource.Megacredits]: "#d4b82f",
    [Resource.Steel]: "#754e2b",
    [Resource.Titanium]: "#63605c",
    [Resource.Plants]: "#42ad45",
    [Resource.Energy]: "#911191",
    [Resource.Heat]: "#cc411f",
}

const ResourceToSecondaryColor = {
    [Resource.TerraformingRating]: "#edd4a1",
    [Resource.Megacredits]: "#f2e8b3",
    [Resource.Steel]: "#b58e6d",
    [Resource.Titanium]: "#c4bcb1",
    [Resource.Plants]: "#a4eba7",
    [Resource.Energy]: "#f0a5f0",
    [Resource.Heat]: "#f0927a",
}

interface ResourceTileProps {
    resourceType: Resource;
}

const ResourceTile: React.FC<ResourceTileProps> = ({resourceType}) => {
    const [showModal, setShowModal] = React.useState(false);

    // value/production and setters will eventually be pulled from redux.
    const [value, setValue] = React.useState(0);

    const handleClickIncrement = () => {
        setValue(prev => prev + 1);
    }

    const handleClickDecrement = () => {
        setValue(prev => prev - 1);
    }

    const handleClickGain = (gainedAmount: number) => {
        setValue(prev => prev + gainedAmount);
    }

    const handleClickSpend = (spentAmount: number) => {
        setValue(prev => prev - spentAmount);
    }


    return (
        <div 
          className="ResourceTile"
          style={{"backgroundColor": ResourceToSecondaryColor[resourceType]}}>
            <div 
              className="ResourceTile-label" 
              style={{"backgroundColor": ResourceToPrimaryColor[resourceType]}}
            >
                <div className="ResourceTile-label-text">
                    {ResourceToLabel[resourceType]}
                </div>
            </div>
           
           {resourceType !== Resource.TerraformingRating ? (
                <div className="ResourceTile-availableValue" onClick={() => setShowModal(true)}>
                    {value}
                </div>
            ) : null}

            <div className="ResourceTile-productionSetter">
                <ProductionSetter 
                  resourceType={resourceType}
                  currentValue={value}
                  onDecrementValue={handleClickDecrement}
                  onIncrementValue={handleClickIncrement} />
            </div>


            <ResourceSpendGainModal 
              modalVisible={showModal} 
              resourceType={resourceType} 
              currentResourceValue={value}
              onHideModal={() => setShowModal(false)} 
              onClickSpend={handleClickSpend}
              onClickGain={handleClickGain}  />
        </div>
    );
}

interface ProductionSetterProps {
    resourceType: Resource;
    currentValue: number;
    onDecrementValue: () => void;
    onIncrementValue: () => void;
}

// ProductionSetter allows modification of a particular resource's production 
// (incrementing/decrementing the value appropriately). For TR, this would mean 
// incrementing/decrementing the actual rating. For all other resources, 
// this changes the production rate.
const ProductionSetter: React.FC<ProductionSetterProps> = ({resourceType, currentValue, onDecrementValue, onIncrementValue}) => {
    const isDecrementDisabled = resourceType === Resource.Megacredits ? currentValue <= -5 : currentValue <= 0;
    return (
        <div className="ProductionSetter">
            <Button size="lg" onClick={onDecrementValue} disabled={isDecrementDisabled}>-</Button>
            <div>{currentValue}</div>
            <Button size="lg" onClick={onIncrementValue}>+</Button>
        </div>
    );
}

interface ResourceSpendGainModalProps {
    modalVisible: boolean;
    resourceType: Resource;
    currentResourceValue: number;
    onHideModal: () => void;
    onClickGain: (resourceAmount: number) => void;
    onClickSpend: (resourceAmount: number) => void;
}
const ResourceSpendGainModal: React.FC<ResourceSpendGainModalProps> = ({
    modalVisible,
    resourceType,
    currentResourceValue,
    onHideModal,
    onClickGain,
    onClickSpend,
}) => {
    const [numUnits, setNumUnits] = React.useState(0);

    const handleHideModal = () => {
        // Trigger prop to hide the modal from view.
        onHideModal();

        // Reset the inputted units
        setNumUnits(0);
    }

    const handleClickSpend = () => {
        onClickSpend(numUnits);
        handleHideModal();
    }


    const handleClickGain = () => {
        onClickGain(numUnits);
        handleHideModal();
    }

    const handleChangeInput = (inputChange: React.ChangeEvent<HTMLInputElement>) => {
        const inputValueAsNum = Number(inputChange.target.value);
        if (isNaN(inputValueAsNum) || inputValueAsNum < 0) {
            return;
        }

        setNumUnits(inputValueAsNum);
    }

    const isValidSpend = numUnits <= currentResourceValue;

    return (
        <Modal show={modalVisible} onHide={handleHideModal}>
        <Modal.Header closeButton>
            <Modal.Title>Spend/Gain {ResourceToLabel[resourceType]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div 
            className="Modal-currentResourceValue"
            style={{"backgroundColor": ResourceToPrimaryColor[resourceType]}}>
                Current resource value: {currentResourceValue} 
            </div>
            <div 
            className="Modal-userInput">
                <InputGroup>
                    <InputGroup.Text>Amount</InputGroup.Text>
                    <input inputMode="numeric" onChange={handleChangeInput}/>
                </InputGroup>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <div className="Modal-footer">
                <Button size="lg" variant="danger" onClick={handleClickSpend} disabled={!isValidSpend}>
                    {isValidSpend ? `Spend ${numUnits}` : `Cannot Spend`}
                </Button>
                <Button size="lg" variant="success" onClick={handleClickGain}>
                    Gain {numUnits}
                </Button>
            </div>
        </Modal.Footer>
    </Modal>
    );
}

export default ResourceTile;
