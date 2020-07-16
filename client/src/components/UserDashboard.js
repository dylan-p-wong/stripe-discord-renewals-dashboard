import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUser }from '../actions/authActions';
import { loadLicenses } from'../actions/licenseActions';
import LicenseHolder from './LicenseHolder';
import InjectCheckoutFrom from './InjectedCheckoutForm';
import FlashMessage from './FlashMessage';
import ReactLoading from 'react-loading';
import { Redirect } from "react-router-dom";

class UserDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentHidden : true,
            bindHidden: true
        }
    }

    async componentDidMount(){
        await this.props.loadUser();
    }

    render() {
        if (!this.props.user ||  this.props.userLoading) return <ReactLoading type={"spinningBubbles"} color={"white"} height={'20%'} width={'20%'} className="loading"/>;

        return (
            <div className="card">
                <FlashMessage/>
                <h1>Welcome {this.props.user.username}#{this.props.user.discriminator}</h1>
                <p>{this.props.user.email}</p>
                <a href="https://discord.gg/bB5JyWJ" target="_blank">Join Discord</a> 
                <br/>
                <InjectCheckoutFrom stripe={this.props.stripe} user={this.props.user}/>
                <LicenseHolder discordID={this.props.user.id}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user:state.auth.user,
    userLoading: state.auth.isLoading,
    licenseLoading: state.license.isLoading,
});

export default connect(mapStateToProps, { loadUser, loadLicenses })(UserDashboard);