import React, {useState} from 'react';
import InputControlled from "../../inputs/inputs";
import {useDispatch} from "react-redux";
import {login} from "../../actions/userActions";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    let flag = false
     const flagChange = () => {
        flag = !flag
    }

    const checkBox = () => {
        if (!flag) {
            localStorage.setItem('checkbox', 'checked')
        }
        if (flag) {
            localStorage.removeItem('checkbox')
        }
    }

    const checkBoxValue = <div className="float-start checkbox" onClick={() => flagChange()}>
        <input type="checkbox" value="lsRememberMe" id="rememberMe" /> <label htmlFor="rememberMe">Remember
        me</label>
    </div>

    return (
        <div className="login center">
            <div className="content">
                <div className="title-style">Login</div>
            </div>
            <div>
                <InputControlled value={email} setValue={setEmail} type="text" placeholder="Email"/>
            </div>
            <div>
                <InputControlled value={password} setValue={setPassword} type="password" placeholder="Password"/>
            </div>
            {checkBoxValue}
            <div onClick={() => dispatch(login(email, password))} >
                <button className="inputs input-button" onClick={() => checkBox()}>
                    Enter
                </button>
            </div>
        </div>
    )


};

export default LoginPage;