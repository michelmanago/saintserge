// libs
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';

// components
import LanguageSwitcher from '../language-switcher/LanguageSwitcher';

// style
import styles from './nav.module.css';

// utils
import {getMenuHref} from '../../utils/utils';
import {signOut, useSession} from 'next-auth/client';

const NavLink = ({item}) => {
    let has_children = !!item.subMenu;
    let href = getMenuHref(item.href);

    if (has_children) {
        return (
            <li>
                <Link href={href}>
                    <a>
                        <span>{item.label}</span>
                        <svg className="parent-icon" viewBox="0 0 1024 1024">
                            <path d="M316 334l196 196 196-196 60 60-256 256-256-256z"></path>
                        </svg>
                        <svg className="parent-toggle" viewBox="0 0 1024 1024">
                            <path d="M316 334l196 196 196-196 60 60-256 256-256-256z"></path>
                        </svg>
                    </a>
                </Link>
                <ul className="subnav md:bg-pred">
                    {item.subMenu.map((subItem, index) => (
                        <NavLink key={'subitem-' + index} item={subItem} />
                    ))}
                </ul>
            </li>
        );
    } else {
        return (
            <li>
                <Link href={href}>
                    <a>{item.label}</a>
                </Link>
            </li>
        );
    }
};

const Nav = ({menu = [], translations}) => {
    const [session] = useSession();

    // methods

    // ref
    const refContainer = useRef();

    const refAdminMenu = useRef();

    // Effect

    useEffect(async () => {
        console.log('refContainer useEffect Call');
        console.log({session, refContainer});
        if (!refContainer.current) return;

        if (session === undefined) return;

        const Navbar = (await import('navbar.js')).default;

        new Navbar(refContainer.current, {
            breakpoint: 768,
            toggleSiblings: true,
            delay: 0,
        });
    }, [refContainer, session]);

    const [needLanguages, setNeedLanguages] = useState(false);

    useEffect(() => {
        console.log({session, menu});
        setNeedLanguages(!window.location.pathname.startsWith('/admin'));
    }, []);

    return (
        <nav ref={refContainer} className="flex items-center navbar bg-pred">
            <button className="navbar-toggle">
                <svg className="menu-icon" viewBox="0 0 1024 1024">
                    <path d="M128 277.333h768v86h-768v-86z m0 298v-84h768v84h-768z m0 214v-86h768v86h-768z" />
                </svg>
            </button>
            <div className={styles.navContainer}>
                <ul className="nav">
                    {menu.map((item, index) => (
                        <NavLink key={'item-' + index} item={item} />
                    ))}
                </ul>

                <div className="flex flex-row items-center">
                    {!session && (
                        <>
                            {/* <Link href={`/inscription`}>
                                <a
                                    className={
                                        'mx-1 text-white border border-transparent rounded-md bg-pgold hover:bg-pblue-dark px-2 py-2'
                                    }
                                >
                                    Inscription
                                </a>
                            </Link> */}
                            <Link href={`/login`}>
                                <a
                                    className={
                                        'mx-1 text-white border border-transparent rounded-md bg-pgold hover:bg-pblue-dark px-2 py-2'
                                    }
                                >
                                    Connexion
                                </a>
                            </Link>
                        </>
                    )}
                    {session && (
                        <>
                            <ul className="nav">
                                <li>
                                    <Link href={'/'}>
                                        <a className={'flex flex-row'}>
                                            <strong>
                                                {session.userBase ? session.userBase.username : session.user.email}
                                            </strong>
                                            <svg className="parent-icon" viewBox="0 0 1024 1024">
                                                <path d="M316 334l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                            <svg className="parent-toggle" viewBox="0 0 1024 1024">
                                                <path d="M316 334l196 196 196-196 60 60-256 256-256-256z"></path>
                                            </svg>
                                        </a>
                                    </Link>

                                    <ul className="subnav right bg-pred">
                                        {session.userBase.role === 'admin' || session.userBase.role === 'author' ? (
                                            <li>
                                                <Link href={`/admin`}>
                                                    <a className={''}>Admin</a>
                                                </Link>
                                            </li>
                                        ) : null}
                                        <li>
                                            <Link href={`/api/auth/signout`}>
                                                <a
                                                    className={''}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        signOut();
                                                    }}
                                                >
                                                    Déconnexion
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </>
                    )}
                    {needLanguages && (
                        <div className="text-gray-900">
                            <LanguageSwitcher translations={translations} />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
