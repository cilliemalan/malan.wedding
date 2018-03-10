import React from 'react';

export class Rsvp extends React.Component {
    constructor(props) {
        super(props);

        // bad I know
        if(props.person) {
            const { email, description, guestlist } = props.person;

            this.state = {
                errors: {},
                name: description,
                email: email,
                num: guestlist && `${guestlist.length} people`,
                special: !!email,
                guests: guestlist
            };
        } else {
            this.state = {
                errors: {},
                yesno: props.email ? null : "yes"
            };
        }

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

    internals() {
        const errorClass = (element) => this.state.errors[element] ? 'error' : '';
        const { special, name, email, num, guests } = this.state;
        const initialEmail = this.props.email;

        if (special) {
            return <div className='rsvpspecial'>
                <p className="note">Please indicate attendance for the Ceremony</p>
                <div className="form">
                    <div className="section1">
                        <label className="group">
                            Name
                        </label>
                        <label className="group">
                            Email
                        </label>
                        <label className="group num">
                            # people
                        </label>
                        <div className="group">
                            <input type="text"
                                value={name}
                                className={`${errorClass('name')}`}
                                name="name"
                                placeholder="Name &amp; Surname"
                                onChange={this.onInputChange}
                                onFocus={this._resolveFocus} />
                        </div>
                        <div className="group">
                            <input type="text"
                                className={`${errorClass('email')}`}
                                value={email}
                                name="email"
                                placeholder="my@email.com"
                                onChange={this.onInputChange} />
                        </div>
                        <div className="group num">
                            <input type="text"
                                className={`${errorClass('num')}`}
                                value={num}
                                name="num"
                                placeholder="# people"
                                onChange={this.onInputChange} />
                        </div>
                    </div>
                    <h2>Dinner RSVP</h2>
                    <p className="note">Please indicate attendance for the Dinner Receiption</p>
                    <ul className="section2">
                        {guests.map((guest, i) => <li key={i}>
                            <input type="checkbox" name="coming" value={guest} id={`chk-${i}`} />
                            <label htmlFor={`chk-${i}`}>{guest}</label>
                        </li>)}
                    </ul>
                    <div className="group submit">
                        <button ref={(me) => { this._button = me; }} >
                            Submit
                        </button>
                    </div>
                </div>
                <div className='smallprint'>
                    <a href="/terms_and_conditions.html" target="_blank">Terms&nbsp;&amp;&nbsp;Conditions</a>
                    &nbsp;and&nbsp;
                    <a href="/privacy_policy.html" target="_blank">Privacy&nbsp;Policy</a>.
                </div>
            </div>;
        } else {
            return <div className='rsvp'>
                <div className="form">
                    <div className="group">
                        <input type="text"
                            value={name}
                            className={`${errorClass('name')}`}
                            name="name"
                            placeholder="Name &amp; Surname"
                            onChange={this.onInputChange}
                            onFocus={this._resolveFocus} />
                    </div>
                    <div className="group">
                        <input type="text"
                            className={`${errorClass('email')}`}
                            value={email}
                            name="email"
                            placeholder="my@email.com"
                            onChange={this.onInputChange} />
                    </div>
                    <div className="group num">
                        <input type="text"
                            className={`${errorClass('num')}`}
                            value={num}
                            name="num"
                            placeholder="# people"
                            onChange={this.onInputChange} />
                    </div>
                    <div className="group submit">
                        <button ref={(me) => { this._button = me; }} >
                            Submit
                        </button>
                    </div>
                </div>
                <div className='smallprint'>
                    <a href="/terms_and_conditions.html" target="_blank">Terms&nbsp;&amp;&nbsp;Conditions</a>
                    &nbsp;and&nbsp;
                        <a href="/privacy_policy.html" target="_blank">Privacy&nbsp;Policy</a>.
                </div>
            </div>;
        }
    }

    yesno() {
        return <div>
            <p className="note">Will you be joining us on the 13th of April?</p>
            <div className="yesno">
                <input type="hidden" name="email" value={this.state.email || this.props.email} />
                <button className="yes" onClick={(e) => { e.preventDefault(); this.setState((state) => ({...state, yesno: "yes"})); } }>YES!</button>
                <button className="no" type="submit">Unfortunately not</button>
            </div>
        </div>
    }

    render() {
        const { yesno } = this.state;

        return <div className="rsvp-outer">
            <h1>RSVP</h1>
            <form method="POST" action="/api/rsvp/">
                <input type="hidden" name="rsvp" value={yesno || "no"} />
                {yesno ? this.internals() : this.yesno()}
            </form>
        </div>
    }
}