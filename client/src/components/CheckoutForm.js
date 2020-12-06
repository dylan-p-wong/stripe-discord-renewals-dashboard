import React, { Component } from 'react';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {purchase} from '../actions/stripeActions';
import { connect } from 'react-redux';

class CheckoutForm extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();

        const {stripe, elements, user} = this.props;

        if (!stripe || !elements){
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email: user.email
            }
        });

        if (error) {
            console.log(error);
        }

        this.props.purchase(paymentMethod.id, user.id, user.email);
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                {this.props.processing ? "Processing...": 
                <div>
                    <CardElement/>
                    <button type="submit" disabled={this.props.processing}>Pay</button>
                </div>
                }
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    processing: state.stripe.isLoading
});

export default connect(mapStateToProps, {purchase})(CheckoutForm);