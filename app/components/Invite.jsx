import React from 'react';
import leavesall from '../content/leavesall.jpg';
import imgnames from '../content/names.png';
import imgtext from '../content/text.png';

export const Invite = (props) =>
    <div className="invite">
        <img src={leavesall} className="leavesall" alt="" />
        <img src={imgnames} className="names" alt="" />
        <img src={imgtext} className="text" alt="" />
        {/* <div className="text">
            <div className="text1">
                MR. JOHN AND REBECCA WALTER<br />
                REQUEST THE HONOUR OF YOUR PRESENCE<br />
                AT THE MARRIAGE OF THEIR DAUGHTER
            </div>
            <div className="text2">
                <div className="section1">
                    SON OF MR. CILLIÉ AND SUZI MALAN
                </div>
                <div className="section2">
                    ON FRIDAY, 13 APRIL, 2018<br />
                    SEATING BEGINS AT 12:45 PM<br />
                    CEREMONY BEGINS AT 1:00 PM
                </div>
                <div className="section3">
                    AT LYNNWOOD BAPTIST CHURCH
                    <div className="smaller">
                        52 JACOBSON DRIVE<br />
                        LYNNWOOD RIDGE<br />
                        PRETORIA, SOUTH AFRICA
                    </div>
                </div>
                <div className="section4">
                    FOR R.S.V.P. AND REGISTRY INFO<br />
                    PLEASE VISIT:<br />
                    www.malan.wedding
                </div>
            </div>
        </div> */}
    </div>

