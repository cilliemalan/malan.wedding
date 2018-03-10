import React from 'react';
import { SaveTheDate } from './SaveTheDate';
import { Registries } from './Registries';
import { Flasher } from './Flasher';
import { Rsvp } from './Rsvp';

export const Home = (props) =>
    <div>
        <Flasher />
        <SaveTheDate />
        <Rsvp />
        <Registries />
    </div>
