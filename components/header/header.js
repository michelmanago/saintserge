// libs
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import {signOut, useSession} from 'next-auth/client';
import Link from 'next/link';

// components
import Nav from '../nav/nav';

export default function Header({menu, translations, currentLanguage}) {
    const [session] = useSession();
    const {t} = useTranslation();

    /** Hooks */
    const router = useRouter();
    const {locale, locales, defaultLocale} = router;

    /** States */
    const [isLangMenuOpened, setIsLangMenuOpened] = useState(false);

    return (
        <header className="bg-pwhite">
            <div className="container max-w-screen-xl bg-white sm:mx-auto">
                <div className="flex flex-col items-center lg:flex-row">
                    {/* Logo */}
                    <div className="flex-shrink-0 w-1/5 min-w-min md:w-1/4">
                        <svg className="" fill="#bba477" xmlns="http://www.w3.org/2000/svg">
                            <path
                                xmlns="http://www.w3.org/2000/svg"
                                d="M134.065,67.032H0A66.719,66.719,0,0,1,11.448,29.554,67.228,67.228,0,0,1,40.94,5.268a66.944,66.944,0,0,1,63.571,6.18A67.228,67.228,0,0,1,128.8,40.941a66.615,66.615,0,0,1,5.268,26.091Z"
                                transform="translate(80 45)"
                            />
                            <text
                                xmlns="http://www.w3.org/2000/svg"
                                fontSize="19px"
                                letterSpacing=".113em"
                                fill="#513f33"
                                className="font-serif font-bold"
                                transform="translate(10 136.249)"
                            >
                                <tspan x="" y="0">
                                    LA COLLINE SAINT-SERGE
                                </tspan>
                            </text>
                        </svg>
                    </div>

                    {/* Title */}
                    <div className="">
                        <div className="mb-5 ml-2 text-xl font-bold text-center md:text-4xl lg:mb-0 lg:text-left text-pred font-logotitle">
                            {t('home:header')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Top bar */}
            <Nav menu={menu} translations={translations} />

            {/* Logo */}
            {/* <img className={"my-3 " + styles.logo} src="/logo.svg" alt="logo"/> */}
        </header>
    );
}
