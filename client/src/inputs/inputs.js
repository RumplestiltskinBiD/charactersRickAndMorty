import React from "react";
import './inputsStyle.css'

const InputControlled = (props) => {
    return (
        <input className="inputs" onChange={(event) => props.setValue(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}/>
    )
}

export default InputControlled