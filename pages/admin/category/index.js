// models
import {getMenu} from '../../../model/menu';

// libs
import Head from 'next/head';
import {getSession} from 'next-auth/client';
import Link from 'next/link';

// components
import Header from '../../../components/header/header';

// parameters
import {capitalize} from '../../../utils/utils';
import {getAllCategories} from '../../../model/category';

export default function AdminCategory({menu, categories}) {
    return (
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
            <Head>
                <title>Admin - Catégories</title>
            </Head>

            {menu && <Header menu={menu.data} />}

            <main className="max-w-screen-xl p-4 bg-white md:mx-auto">
                <h1 className="mb-3 text-4xl font-semibold">Modifier les catégories</h1>
                <ul className="pl-5">
                    {categories.map(
                        cat =>
                            cat.title != 'home' &&
                            cat.title != 'articles' && (
                                <li key={cat.id}>
                                    <Link href={`/admin/category/${cat.title}`}>
                                        <a className="text-lg text-blue-500 underline">{capitalize(cat.title)}</a>
                                    </Link>
                                </li>
                            ),
                    )}
                </ul>
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    const {req} = context;
    const session = await getSession({req});

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?redirect=admin/category`,
            },
        };
    }

    // data
    const menu = await getMenu(context.locale);
    const categories = await getAllCategories();

    return {
        props: {
            menu: menu,
            categories,
        },
    };
}
