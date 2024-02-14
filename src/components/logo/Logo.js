import React from 'react';
import './Logo.css';

export default function Logo() {
    return (
        <>
            {/* Facebook logo row */}
            <div className="row">
                <div className="col">
                    {/* Facebook logo image */}
                    <img
                        src={process.env.PUBLIC_URL + '/facebook-logo-text.svg'}
                        alt="facebooklogo"
                        className="img-fluid logo"
                    />
                </div>
            </div>
            {/* Text below the Facebook logo row */}
            <div className="row">
                <div className="col">
                    {/* Text below the Facebook logo */}
                    <p className="text-below-logo">
                        Connect with friends and the world around you on Facebook.
                    </p>
                </div>
            </div>
        </>
    );
}
