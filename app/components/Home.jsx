import React from 'react';
import { Invite } from './Invite';
import { Registries } from './Registries';
import { Flasher } from './Flasher';
import { Link } from 'react-router-dom';
import { Livestream } from './Livestream';

export const Home = (props) =>
    <div>
        <Flasher />
        <Invite />
        <div className="rsvp-block">
            <h1>Live Stream</h1>
            <Livestream />
        </div>
        <Registries />
    </div>
