import React from "react";

import Button from "react-bootstrap/Button";
import {Resource} from "../../utils/types";
import ResourceTile from "../resource_tile/resource_tile";
import GenerationPhase from "../../components/generation_phase/generation_phase";;

import "./player_board.css";

const PlayerBoard: React.FC<{}> = () => {
    return (
        <div className="PlayerBoard">
            <div className="PlayerBoard-row PlayerBoard-header">
                <ResourceTile resourceType={Resource.TerraformingRating}/>
                <div>
                    <Button size="lg" onClick={resetGame}>New Game</Button>
                    <br />
                    <br />
                    <GenerationPhase />
                </div>
            </div>
            <div className="PlayerBoard-row">
                <ResourceTile resourceType={Resource.Megacredits}/>
                <ResourceTile resourceType={Resource.Steel}/>
                <ResourceTile resourceType={Resource.Titanium}/>
                
            </div>
            <div className="PlayerBoard-row">
                <ResourceTile resourceType={Resource.Plants}/>
                <ResourceTile resourceType={Resource.Energy}/>
                <ResourceTile resourceType={Resource.Heat}/>
            </div>


        </div>
    );
}

const resetGame = () => {
    localStorage.removeItem('reduxState');
};

export default PlayerBoard;