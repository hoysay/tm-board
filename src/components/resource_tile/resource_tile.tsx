import React from "react";
import { Modal, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import {Amounts, IState, Resource, ResourceAmount, ResourceToLabel} from "../../utils/types";

import "./resource_tile.css";

import { connect } from "react-redux";
import { increment, decrement } from "../../redux/actions";

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

interface OwnProps {
    resourceType: Resource,
}

interface ResourceTileProps {
    resourceType: Resource,
    resourceAmounts: Amounts,
    increment: typeof increment,
    decrement: typeof decrement,
}

interface ResourceTileState {
    showModal: boolean;
}

class ResourceTile extends React.Component<ResourceTileProps, ResourceTileState> {
    constructor(props: ResourceTileProps) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    setShowModal = (shouldShowModal: boolean) => {
        this.setState({
            showModal: shouldShowModal
        });
    }

    value = () => {
        return this.props.resourceAmounts.value;
    }

    production = () => {
        return this.props.resourceAmounts.production;
    }

    handleIncrementValue = (gainedAmount: number) => {
        this.props.increment({resource: this.props.resourceType, value: gainedAmount, production: 0});
    }

    handleDecrementValue = (spentAmount: number) => {
        this.props.decrement({resource: this.props.resourceType, value: spentAmount, production: 0});
    }

    handleIncrementProduction = () => {
        this.props.increment({resource: this.props.resourceType, value: 0, production: 1});
    }

    handleDecrementProduction = () => {
        this.props.decrement({resource: this.props.resourceType, value: 0, production: 1});
    }


    render() {
        const resourceType = this.props.resourceType;

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
                <div className="ResourceTile-availableValue" onClick={() => this.setShowModal(true)}>
                    {this.value()}
                </div>
            ) : null}

            <div className="ResourceTile-productionSetter">
                <ProductionSetter 
                  resourceType={resourceType}
                  currentValue={this.production()}
                  onDecrementValue={this.handleDecrementProduction}
                  onIncrementValue={this.handleIncrementProduction} />
            </div>


            <ResourceSpendGainModal 
              modalVisible={this.state.showModal} 
              resourceType={resourceType} 
              currentResourceValue={this.value()}
              onHideModal={() => this.setShowModal(false)} 
              onClickSpend={this.handleDecrementValue}
              onClickGain={this.handleIncrementValue}  />
        </div>
    )
    };
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
            style={{"backgroundColor": ResourceToSecondaryColor[resourceType]}}>
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

const mapStateToProps = (state: IState, ownProps: OwnProps) => {
    const { resourceType } = ownProps
    return {
        resourceAmounts: state.resourceReducer[resourceType]
    };
}

export default connect(
    mapStateToProps,
   { increment, decrement }
 )(ResourceTile);
