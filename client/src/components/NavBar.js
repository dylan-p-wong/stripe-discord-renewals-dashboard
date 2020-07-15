import React, { Component } from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';

class NavBar extends Component {
    render() {
        const loggedInLinks = (
            <div>
                <Link to="/" style={{float: "left"}}>Home</Link>
                <a onClick={this.props.logout} style={{float: "right", cursor: "pointer"}}>Logout</a>
                <Link to="/dashboard" style={{float: "right"}}>Dashboard</Link>
            </div>
        )

        const otherLinks = (
            <div>
                <Link to="/" style={{float: "left"}}>Home</Link>
                <a href="http://localhost:1812/auth/login" style={{float: "right"}}>Login</a>
            </div>
        )

        return (
            <div className="navbar">
                {this.props.isAuthenticated ? loggedInLinks : otherLinks}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(NavBar);