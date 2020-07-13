import React, { Component } from 'react';
import { Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

class InjectedCheckoutForm extends Component {
    render() {
        return (
            <div>
                <Elements stripe={this.props.stripe}>
                        <ElementsConsumer>
                            {({elements, stripe}) => (
                                <CheckoutForm elements={elements} stripe={stripe} user={this.props.user}/>
                            )}
                        </ElementsConsumer>
                    </Elements>
            </div>
        );
    }
}

export default InjectedCheckoutForm;