import React from 'react';

const mustFlash = /\bflash\b/i.test(location.hash);

export class Flasher extends React.Component {
    constructor() {
        super();
        this.state = { mustFlash }
        this.hideme = this.hideme.bind(this);
    }

    hideme() {
        this.setState({ mustFlash: false });
    }

    render() {
        if (this.state.mustFlash) {
            return <div id="flasher">
                We will keep you posted!
                <a href="javascript:void(0)" onClick={this.hideme}>×</a>
            </div>;
        } else {
            return null;
        }
    }
}