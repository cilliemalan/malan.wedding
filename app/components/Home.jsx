import React from 'react';
import { SaveTheDate } from './SaveTheDate';
import { KeepMeInTheLoop } from './KeepMeInTheLoop';
import { Registries } from './Registries';
import { Flasher } from './Flasher';

export const Home = (props) =>
    <div>
        <Flasher />
        <SaveTheDate />
        <KeepMeInTheLoop />
        <Registries />
    </div>
