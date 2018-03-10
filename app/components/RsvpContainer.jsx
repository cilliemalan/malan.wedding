import React from 'react';
import { Rsvp } from './Rsvp';
import leavesall from '../content/leavesall.jpg';
import _people from '../data/people.csv';


const people = _people.map(({ email, description, guestlist }) => ({ email: email.replace('HAHAHAHAHA', '@') , description, guestlist: guestlist.split(',') }));


export const RsvpContainer = (props) => {
    
    const hasEmail = props && props.match && props.match.params && props.match.params.email;
    const person = hasEmail && people.filter(x => x.email == props.match.params.email)[0];

    return <div className="rsvpextender">
        <div className="rsvpcontainer">
            <img className="leaves" src={leavesall} />
            <Rsvp person={person} />
        </div>
    </div>;
}