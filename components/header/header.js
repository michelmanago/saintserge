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

                <div className="flex items-center border">

                    {/* Logo */}
                    <div className="w-1/5 md:w-1/4">
                        <svg fill="#bba477" xmlns="http://www.w3.org/2000/svg">
                            <path xmlns="http://www.w3.org/2000/svg" d="M134.065,67.032H0A66.719,66.719,0,0,1,11.448,29.554,67.228,67.228,0,0,1,40.94,5.268a66.944,66.944,0,0,1,63.571,6.18A67.228,67.228,0,0,1,128.8,40.941a66.615,66.615,0,0,1,5.268,26.091Z" transform="translate(163.68 47.672)"/>
                        </svg>
                    </div>

                    {/* Title */}
                    <div className="w-4/5 md:w-3/4">
                        <div className="w-4/5 md:w-3/4 ml-2 text-xl md:text-4xl font-bold text-pred font-logotitle">
                            La colline Saint Serge
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
