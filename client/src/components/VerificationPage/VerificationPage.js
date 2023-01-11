import React, { useState } from 'react';
import InputControlled from "../../inputs/inputs";
import { registration } from "../../actions/userActions";


const VerificationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login center">
            <div className="content">
                <div className="title-style">Registration</div>
            </div>
            <div>
                <InputControlled value={email} setValue={setEmail} type="text" placeholder="Email"/>
            </div>
            <div>
                <InputControlled value={password} setValue={setPassword} type="password" placeholder="Password"/>
            </div>
            <button className="inputs input-button" onClick={() => registration(email, password)}>
                Enter
            </button>
        </div>
    )
};

export default VerificationPage;