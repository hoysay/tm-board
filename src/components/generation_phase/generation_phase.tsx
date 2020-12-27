import React from "react";

import Button from "react-bootstrap/Button";
import "./generation_phase.css";

// this should take in redux props modify data
class GenerationPhase extends React.Component<{}> {
    onIncrementValue = () =>{
        console.log("Generate!");
    }
    
    render() {
        return (
            <div className="GenerationPhase">
                <Button size="lg" onClick={this.onIncrementValue}>Generate</Button>
            </div>
        );
    }
}

export default GenerationPhase;