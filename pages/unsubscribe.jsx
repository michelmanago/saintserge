import Head from 'next/head';
import {useRouter} from 'next/router';

import {unsubscribeAdherent} from '../dao/adherent';
import Header from '../components/header/header';
import {getMenu} from '../model/menu';

// styles
const bannerStyles = {
    height: 360,
};

export default function Index({menu}) {
    const router = useRouter();
    const {locale} = router;

    return (
        <div className="">
            <Head>
                <title>Colline Saint Serge</title>
            </Head>

            <div className="container max-w-screen-xl bg-white sm:mx-auto">
                {/* Header */}
                {menu && <Header menu={menu.data} currentLanguage={locale} />}

                {/* Content */}
                <main className="h-full max-w-screen-xl px-5 py-10 mx-auto bg-white">
                    <div className="flex flex-col items-center justify-center">
                        <p>Vous êtes maintenant désinscrit de notre newsletter</p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export const getServerSideProps = async ctx => {
    const menu = await getMenu(ctx.locale);
    const {email} = ctx.query;
    // console.log({params: ctx.query});
    try {
        const res = await unsubscribeAdherent(email);
    } catch (error) {}
    return {
        props: {
            menu,
        },
    };
};
