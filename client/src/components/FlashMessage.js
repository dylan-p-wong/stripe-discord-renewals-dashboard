import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteMessage } from '../actions/messageActions';

class FlashMessage extends Component {
    onDeleteButton = (event) => {
        event.preventDefault();
        this.props.deleteMessage();
    }

    render() {
        if (!this.props.message.text) return null;
        return (
            <div className="flash">
                <p>{this.props.message.text}</p>
                <button onClick={this.onDeleteButton}>X</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    message: state.message
});

export default connect(mapStateToProps, {deleteMessage})(FlashMessage);