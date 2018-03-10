import React from 'react';
import { Invite } from './Invite';
import { Registries } from './Registries';
import { Flasher } from './Flasher';
import { Rsvp } from './Rsvp';

export const Home = (props) =>
    <div>
        <Flasher />
        <Invite />
        <Rsvp />
        <Registries />
    </div>
