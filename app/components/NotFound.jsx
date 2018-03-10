import React from 'react';
import { Link } from 'react-router-dom'

export const NotFound = (props) =>
    <div className="notfound">
        404 <br />
        Not Found
        <p><Link to="/">Go Back</Link></p>
    </div>