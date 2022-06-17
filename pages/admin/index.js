// libs
import {getSession, useSession} from 'next-auth/client';
import Link from 'next/link';
import Head from 'next/head';

// components
import Header from '../../components/header/header';

// models
import {getMenu} from '../../model/menu';
import {getLastPages} from '../../model/page';
import {useState} from 'react';
import {fetchWrapper} from '../../lib/utils';

const linkStyles = {
    width: 300,
};

export default function AdminIndex({menu, homePage}) {
    const [session] = useSession();
    const [home, setHome] = useState(homePage);
    const [isChangingHome, setIsChangingHome] = useState(false);
    const [pageSearch, setPageSearch] = useState('');
    const [pageResults, setPageResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    console.log({session});
    return (
        <>
            <Head>
                <title>Administrer le site</title>
            </Head>

            {menu && <Header menu={menu.data} />}
            <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
                <h1 className="mb-5 text-4xl font-semibold">Administrer le site</h1>
                {session?.userBase.role === 'admin' && (
                    <>
                        <div className="flex flex-col">
                            <BlockLink label="Pages" href="/admin/page" />
                            <BlockLink label="Articles" href="/admin/article" />
                            <BlockLink label="Catégories" href="/admin/category" />
                            <BlockLink label="Menus de navigation" href="/admin/editor-menu" />
                            <BlockLink label="Utilisateurs" href="/admin/users/create" />
                            <BlockLink label="Media" href="/admin/media" />
                        </div>
                        <div>
                            <h2>Page d'accueil</h2>
                            <div>
                                {!home && (
                                    <div>
                                        <div
                                            className="p-1 text-white bg-blue-600 rounded"
                                            onClick={() => setIsChangingHome(true)}
                                        >
                                            Ajouter
                                        </div>
                                    </div>
                                )}
                                {home && (
                                    <div className="flex flex-row items-center gap-1">
                                        <div>{home.id}</div>
                                        <div>{home.pageName}</div>
                                        <Link href={`/admin/page/${home.id}`}>
                                            <a className="p-1 text-white bg-blue-600 rounded">Editer</a>
                                        </Link>
                                        <button
                                            className="p-1 text-white bg-yellow-500 rounded"
                                            onClick={() => setIsChangingHome(true)}
                                        >
                                            Changer
                                        </button>
                                        <button
                                            className="p-1 text-white bg-red-600 rounded"
                                            onClick={async e => {
                                                if (
                                                    window.confirm(
                                                        "Etes vous sure de vouloir réinitialiser la page d'accueil ?",
                                                    )
                                                ) {
                                                    let res = await fetchWrapper('/api/page/home', null, 'POST');
                                                    if (res.status === 200) {
                                                        setHome(null);
                                                    }
                                                }
                                            }}
                                        >
                                            Réinitialiser
                                        </button>
                                    </div>
                                )}
                                {isChangingHome && (
                                    <div className="flex flex-row items-center gap-1">
                                        <div>Recherche</div>
                                        <div className="relative flex flex-col w-2/3 h-9">
                                            <input
                                                className="p-1 border rounded"
                                                value={pageSearch}
                                                onChange={async e => {
                                                    setPageSearch(e.target.value);
                                                    if (e.target.value.length > 3) {
                                                        let res = await fetchWrapper(
                                                            '/api/page/search',
                                                            {pageName: e.target.value},
                                                            'POST',
                                                        );
                                                        let results = await res.json();
                                                        setPageResults(results);
                                                    }
                                                }}
                                                onFocus={() => setShowResults(true)}
                                                type="text"
                                            />
                                            {showResults && (
                                                <div className="absolute w-full bg-white border-t border-l border-r rounded top-9">
                                                    {pageResults.length > 0 &&
                                                        pageResults.map(page => (
                                                            <div
                                                                className="px-2 border-b rounded cursor-pointer"
                                                                onClick={async e => {
                                                                    console.log(page);
                                                                    page.page = 'home';
                                                                    let res = await fetchWrapper(
                                                                        '/api/page/home',
                                                                        page,
                                                                        'POST',
                                                                    );
                                                                    if (res.status === 200) {
                                                                        setPageSearch('');
                                                                        setIsChangingHome(false);
                                                                        setPageResults([]);
                                                                        setHome(page);
                                                                    }
                                                                }}
                                                                key={page.id}
                                                            >
                                                                {page.pageName}
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
                {session?.userBase.role === 'author' && (
                    <div className="flex flex-col">
                        <BlockLink label="Articles" href="/admin/article" />
                    </div>
                )}
            </main>
        </>
    );
}

const BlockLink = ({label, href}) => (
    <div>
        <Link href={href}>
            <a
                style={linkStyles}
                className="inline-block px-3 py-1 mb-3 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
            >
                {label}
            </a>
        </Link>
    </div>
);

export async function getServerSideProps(context) {
    const {req, locale} = context;
    const session = await getSession({req});

    const menu = await getMenu(locale);
    let homePageArray = await getLastPages(context.locale, 'home', 1);
    let homePage = homePageArray ? homePageArray[0] : null;

    if (!session)
        return {
            redirect: {
                permanent: false,
                destination: '/login?redirect=admin',
            },
        };
    return {
        props: {
            menu,
            homePage,
        },
    };
}
