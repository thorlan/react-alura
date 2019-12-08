import React, { Component } from 'react';

class SubmitCustomizado extends Component {

    render() {
        return (
            <div className="pure-control-group">
                <button type="submit" className="pure-button pure-button-primary">{this.props.label}</button>
            </div>
        );
    }


}

export default SubmitCustomizado