import React from 'react';


export class Rsvp extends React.Component {
    constructor() {
        super();

        this.state = {
            errors: {},
        };

        this.clearForm = this.clearForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    clearForm() {
        this.setState(() => { errors: { } });
    }

    onSubmit() {

    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const errorClass = (element) => this.state.errors[element] ? 'error' : '';

        return <div className="rsvp">
            <h1>RSVP</h1>
            <form id="rsvpForm" onSubmit={this.onSubmit} ref={(f) => { this._form = f; }}>
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
            <div className='smallprint'>
                    <a href="/terms_and_conditions.html" target="_blank">Terms&nbsp;&amp;&nbsp;Conditions</a>
                &nbsp;and&nbsp;
                    <a href="/privacy_policy.html" target="_blank">Privacy&nbsp;Policy</a>.
                </div>
        </div>;
    }
}