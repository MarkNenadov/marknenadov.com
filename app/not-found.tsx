import React from 'react';
import SocialMediaLinks from './Components/SocialMediaLinks';
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="min-h-[100vh] max-w-7xl m-3">
            <div className={"flex flex-col space-y-3 p-4  m-4 w-full items-center"}>
                <div className="text-6xl text-center">Mark Nenadov</div>

                <SocialMediaLinks />

                <div className="w-full m-3 p-3 border border-1 border-black">
                    <span className="text-5xl">404</span>
                    <div>The page you are looking for does not exist. <Link className="underline text-blue-900" href="/">Try this</Link>.</div>
                </div>

            </div>
        </div>
    );
}