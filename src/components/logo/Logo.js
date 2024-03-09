import React from 'react';
import './Logo.css';

export default function Logo() {
    return (
        <>
            <div className="row">
                <div className="col">
                    <img
                        src={process.env.PUBLIC_URL + '/facebook-logo-text.svg'}
                        alt="facebooklogo"
                        className="img-fluid logo"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="text-below-logo">
                        Connect with friends and the world around you on Facebook.
                    </p>
                </div>
            </div>
        </>
    );
}
