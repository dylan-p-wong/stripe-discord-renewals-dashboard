import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';

class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <Link to="/" style={{float: "left"}}>Home</Link>
                <a onClick={this.props.logout} style={{float: "right"}}>Logout</a>
                <a href="http://localhost:1812/auth/login" style={{float: "right"}}>Login</a>
                <Link to="/dashboard" style={{float: "right"}}>Dashboard</Link>
            </div>
        );
    }
}

export default connect(null, {logout})(NavBar);