import React, { Component } from 'react';
import { connect } from 'react-redux';
import {cancel} from '../actions/stripeActions';

class License extends Component {
    onCancelButton = (event) => {
        event.preventDefault();
        this.props.cancel(this.props.license.key);
    }

    render() {
        return (
            <div className="license">
                <p className="license-key">{this.props.license.key}</p>
                <p>Cancel at Period End: {this.props.license.status.cancel_period_end ? "true" : "false"}</p>
                <p>Activated: {this.props.license.status.activated ? "true" : "false"}</p>
                <br/>
                <p>Payment Info</p>
                <p>{this.props.license.paymentInfo.card.brand} {this.props.license.paymentInfo.card.last_4} {this.props.license.paymentInfo.card.exp_month >= 10 ? this.props.license.paymentInfo.card.exp_month : "0" + this.props.license.paymentInfo.card.exp_month}/{this.props.license.paymentInfo.card.exp_year}</p>
                <br/>
                <p>Creation: {new Date(this.props.license.paymentInfo.dates.creation_date * 1000).toDateString()}</p>
                <p>Period Start: {new Date(this.props.license.paymentInfo.dates.period_start * 1000).toDateString()}</p>
                <p>Period End: {(new Date(this.props.license.paymentInfo.dates.period_end * 1000)).toDateString()}</p>
                <button onClick={this.onCancelButton}>Cancel Subsciption</button>
            </div>
        );
    }
}

export default connect(null, {cancel})(License);