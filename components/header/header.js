// libs
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import Link from "next/link"

// styles
import styles from '../../styles/components/header.module.css';

// components
import Image from 'next/image';
import Nav from '../nav/nav';

export default function Header({ menu, translations }) {
    const [session] = useSession();

    /** Hooks */
    const router = useRouter();
    const { locale, locales, defaultLocale } = router;

    /** States */
    const [isLangMenuOpened, setIsLangMenuOpened] = useState(false);

    return (
        <header className="bg-pwhite">
            <div className="container max-w-screen-xl bg-white sm:mx-auto">

                <div className="flex flex-col lg:flex-row items-center">
                    {/* Logo */}
                    <div className="min-w-min w-1/5 md:w-1/4 flex-shrink-0">
                        <svg className="" fill="#bba477" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" d="M134.065,67.032H0A66.719,66.719,0,0,1,11.448,29.554,67.228,67.228,0,0,1,40.94,5.268a66.944,66.944,0,0,1,63.571,6.18A67.228,67.228,0,0,1,128.8,40.941a66.615,66.615,0,0,1,5.268,26.091Z" transform="translate(80 45)"/>
                            <text xmlns="http://www.w3.org/2000/svg" fontSize="19px" letterSpacing=".113em" fill="#513f33" className="font-serif font-bold" transform="translate(10 136.249)"><tspan x="" y="0">LA COLLINE SAINT-SERGE</tspan></text>
                        </svg>
                    </div>

                    {/* Title */}
                    <div className="">
                        <div className="ml-2 text-xl md:text-4xl mb-5 lg:mb-0 text-center lg:text-left font-bold text-pred font-logotitle">
                            Association pour la restauration de la colline Saint-Serge à Paris
                        </div>
                    </div>

                    
                </div>
            </div>

            {/* Top bar */}
            <Nav 
                menu={menu}
                translations={translations}
            />

            {session && (
                <div className='flex flex-row items-center justify-center'>
                    {session.user.image && (
                        <span style={{ backgroundImage: `url(${session.user.image})` }} className={''} />
                    )}
                    <span className={'mr-2'}>
                        <small>Signed in as</small>
                        <br />

                        <strong>{session.userBase ? session.userBase.username : session.user.name}</strong>
                    </span>
                    <Link
                        href={`/api/auth/signout`}
                    >
                        <a
                            className={
                                'mx-1 text-white border border-transparent rounded-md bg-pred hover:bg-pred-dark px-2 py-2'
                            }
                            onClick={e => {
                                e.preventDefault();
                                signOut();
                            }}
                        >
                            Sign out
                        </a>
                    </Link>
                </div>
            )}

            {/* Logo */}
            {/* <img className={"my-3 " + styles.logo} src="/logo.svg" alt="logo"/> */}
        </header>
    );
}
