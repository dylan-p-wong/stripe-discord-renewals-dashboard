import React, { Component } from 'react';
import configData from '../config.json';

class LoginButton extends Component {
    render() {
        return (
            <div>
                <a href={configData.LOGIN_LINK}>Login</a>
            </div>
        );
    }
}

export default LoginButton;