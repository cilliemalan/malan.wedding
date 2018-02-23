import React from 'react';



export class KeepMeInTheLoop extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            errors: {},
            dots: '.'
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

    componentDidMount() {
        this._interval = setInterval(() => this.setState((os) => { dots: '.' + os.dots }), 300);
    }

    componentWillUnmount() {
        window.clearInterval(this._interval);
        delete this._interval;
    }

    validate() {
        const errors = this.state.errors;
        errors.email = !this.state.email || !/(?=.+@.+\..+).+/.test(this.state.email);
        errors.name = !this.state.name;
        this.setState({ errors });
        return !Object.values(errors).filter(x => x).length;
    }

    onSubmit(event) {
        if (this.validate()) {
            const formData = { email: this.state.email, name: this.state.name };
            this.setState({ state: 'submitting' });
            fetch('/api/contact', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.setState({ state: 'submitted' });
                setTimeout(() => { this.setState({ state: null }); }, 3000);
            }, () => {
                this.setState({ state: 'error' });
                setTimeout(() => { this.setState({ state: null }); }, 3000);
            });
        }
        event.preventDefault();
    }

    onInputChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const errorClass = (element) => this.state.errors[element] ? 'error' : '';

        let guts;
        switch (this.state.state) {
            case 'submitting': guts = <div>{this.state.dots}</div>; break;
            case 'submitted': guts = <div>✔️&nbsp;Details&nbsp;Submitted</div>; break;
            case 'error': guts = <div>whoops</div>; break;
            default: guts = <div>
                <form id="keepMeInTheLoopForm" onSubmit={this.onSubmit} ref={(f) => { this._form = f; }}>
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
                    Please&nbsp;see&nbsp;
                    <a href="/terms_and_conditions.html" target="_blank">Terms&nbsp;&amp;&nbsp;Conditions</a>
                    &nbsp;and&nbsp;
                    <a href="/privacy_policy.html" target="_blank">Privacy&nbsp;Policy</a>.
                </div>
            </div>;
        }

        return <div id="keepMeInTheLoop">
            <h1>Keep me in the loop!</h1>
            {guts}
        </div>;
    }
}