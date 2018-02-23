import React from 'react';
import { SaveTheDate } from './SaveTheDate';
import { KeepMeInTheLoop } from './KeepMeInTheLoop';
import { Registries } from './Registries';

export const Home = (props) =>
    <div>
        <SaveTheDate />
        <KeepMeInTheLoop />
        <Registries />
    </div>
