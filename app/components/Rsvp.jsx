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

        return <div className="rsvp"><h1>RSVP</h1></div>
    }
}