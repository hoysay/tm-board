import React from "react";

import Button from "react-bootstrap/Button";

const ResourceTile: React.FC<{}> = () => {
    const [value, setValue] = React.useState(0);
    const [productionRate, setProductionRate] = React.useState(0);


    const handleClickIncrement = () => {
        setValue(prev => prev + 1);
    }

    const handleClickDecrement = () => {
        setValue(prev => prev - 1);
    }



    return (
        <div>
            <Button variant="primary" size="lg" onClick={handleClickDecrement}>-</Button>
            <div>Value is: {value}</div>
            <Button onClick={handleClickIncrement}>+</Button>
  
        </div>
    );
}

export default ResourceTile;