import React from 'react';

export const KeepMeInTheLoop = (props) =>
    <div id="keepMeInTheLoop">
        <h1>Keep me in the loop!</h1>
        <form id="keepMeInTheLoopForm">
            <div id="group">
                <input type="text" placeholder="Name" />
            </div>
            <div id="group">
                <input type="email" placeholder="my@email.com" />
            </div>
            <button className="g-recaptcha"
                data-sitekey="6LcBKUgUAAAAAIvnSK__kPy9zW2xRj2UoDQDkvpj"
                data-callback="YourOnSubmitFn">
                Submit
            </button>
        </form>
    </div>

