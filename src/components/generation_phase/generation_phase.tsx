import React from "react";

import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

import {generate} from "../../redux/actions";

import "./generation_phase.css";

interface GenerationPhaseDispatchProps {
    generate: typeof generate,
}

class GenerationPhase extends React.Component<GenerationPhaseDispatchProps> {
    onHandleGenerate = () =>{
        this.props.generate();
    }
    
    render() {
        return (
            <div className="GenerationPhase">
                <Button size="lg" onClick={this.onHandleGenerate}>Generate</Button>
            </div>
        );
    }
}


export default connect(() => {}, {generate})(GenerationPhase);