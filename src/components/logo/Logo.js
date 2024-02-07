import React from 'react'
import facebooklogo from '../res/4lCu2zih0ca.svg'
import './Logo.css'

export default function Logo() {
    return (
        <>
            <div className="row">
                <div className="col">
                    <img
                        src={facebooklogo}
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
            </div></>
    )
}
