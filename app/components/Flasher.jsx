import React from 'react';


export class Flasher extends React.Component {
    constructor(p) {
        super(p);
        this.hideme = this.hideme.bind(this);
        this.hashChange = this.hashChange.bind(this);
    }

    hashChange() {
        const flashmatch = location.hash.match(/\b(flash|error|sorry|thanks)\b/i);
        const flash = flashmatch && flashmatch[1];
        const mustFlash = !!flash;
        this.setState((state) => ({ ...state, mustFlash, flash }))
    }

    componentWillMount() {
        addEventListener('hashchange', this.hashChange);
        this.hashChange();
    }

    componentWillUnmount() {
        removeEventListener('hashchange', this.hashChange);
    }

    hideme() {
        window.location.hash = "";
    }

    render() {
        let message;
        switch (this.state.flash) {
            case "error": message = "Something went wrong with your submission. Please try again!"; break;
            case "thanks": message = "We're glad you can join us!"; break;
            case "sorry": message = "We'll miss you!"; break;
            case "flash": message = "We will keep you posted!"; break;
        }
        if (message) {
            return <div id="flasher">
                {message}
                <a href="javascript:void(0)" onClick={this.hideme}>×</a>
            </div>;
        } else {
            return null;
        }
    }
}