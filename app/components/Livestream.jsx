import React from 'react';
import moment from 'moment';

export class Livestream extends React.Component {
    constructor(...stuff) {
        super(...stuff);

        this.state = { time: new Date(), event: new Date(2018, 3, 13, 13, 0, 0) };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.render = this.render.bind(this);
    }

    updateTime() {
        this.setState({ time: new Date() });
    }

    componentDidMount() {
        this._timeout = window.setTimeout(this.updateTime, 60000);
    }

    componentWillUnmount() {
        window.clearTimeout(this._timeout);
    }

    render() {
        const relative = moment(this.state.event).fromNow();
        return <div>
            Join us for the <a href="https://www.youtube.com/watch?v=y48M2_ys90Q">live stream on youtube</a> in <strong>{relative}</strong>!
        </div>;
    }
}