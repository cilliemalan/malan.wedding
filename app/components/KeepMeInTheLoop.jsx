import React from 'react';



export class KeepMeInTheLoop extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            errors: {}
        };

        // render recaptcha when focus on name
        const reCaptchaReady = new Promise(window.logRecaptchaReady);
        const pFocus = new Promise((resolve) => this._resolveFocus = resolve);

        Promise.all([pFocus, reCaptchaReady]).then(() => {
            //grecaptcha.render(this._button, { sitekey: recaptchaKey }, true);
        });

        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    validate() {
        const errors = this.state.errors;
        errors.email = !this.state.email || !/(?=.+@.+\..+).+/.test(this.state.email);
        errors.name = !this.state.name;
        this.setState({ errors });
        return !Object.values(errors).filter(x=>x).length;
    }

    onSubmit(event) {
        console.log('onSubmit');
        if (this.validate()) {
            console.log('submitting');
        } else {
            console.log('not submitting');
        }
        event.preventDefault();
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const errorClass = (element) => this.state.errors[element] ? 'error' : '';

        return <div id="keepMeInTheLoop">
            <h1>Keep me in the loop!</h1>
            <form id="keepMeInTheLoopForm" onSubmit={this.onSubmit}>
                <div id="group">
                    <input type="text"
                        value={this.state.name}
                        className={`${errorClass('name')}`}
                        name="name"
                        placeholder="Name &amp; Surname"
                        onChange={this.onInputChange}
                        onFocus={this._resolveFocus} />
                </div>
                <div id="group">
                    <input type="text"
                        className={`${errorClass('email')}`}
                        value={this.state.email}
                        name="email"
                        placeholder="my@email.com"
                        onChange={this.onInputChange} />
                </div>
                <div id="group">
                    <button ref={(me) => { this._button = me; }} >
                        Submit
                    </button>
                </div>
            </form>
        </div>;
    }
}