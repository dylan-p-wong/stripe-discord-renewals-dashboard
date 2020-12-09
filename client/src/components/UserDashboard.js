import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUser }from '../actions/authActions';
import { loadLicenses } from'../actions/licenseActions';
import LicenseHolder from './LicenseHolder';
import InjectCheckoutFrom from './InjectedCheckoutForm';
import FlashMessage from './FlashMessage';
import ReactLoading from 'react-loading';
import configData from '../config.json';

class UserDashboard extends Component {

    async componentDidMount(){
        await this.props.loadUser();
    }

    render() {
        if (!this.props.user ||  this.props.userLoading) return null;

        return (
        <div>
            <div className="card">
                <h1>Welcome {this.props.user.username}#{this.props.user.discriminator}</h1>
                <p>{this.props.user.email}</p>
                <br></br>
                <a className="join-discord" href={configData.SERVER_JOIN_LINK} target="_blank">Join Discord</a> 
                <br/>
                <div>
                    <InjectCheckoutFrom stripe={this.props.stripe} user={this.props.user}/>
                </div>
            </div>
            <LicenseHolder discordID={this.props.user.id}/>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user:state.auth.user,
    userLoading: state.auth.isLoading,
    licenseLoading: state.license.isLoading,
    processing: state.stripe.isLoading
});

export default connect(mapStateToProps, { loadUser, loadLicenses })(UserDashboard);