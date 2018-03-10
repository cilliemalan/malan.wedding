import React from 'react';
import { Invite } from './Invite';
import { Registries } from './Registries';
import { Flasher } from './Flasher';
import { Link } from 'react-router-dom';

export const Home = (props) =>
    <div>
        <Flasher />
        <Invite />
        <div className="rsvp-block">
        <h1>RSVP</h1>
            <p className="note">
                The ceremony is open for anyone who wants to join us!
            </p>
            <Link className="rsvp-button" to="/rsvp/">RSVP</Link>
        </div>
        <Registries />
    </div>
