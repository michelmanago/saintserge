// libs
import {useRouter} from 'next/router';
import Head from 'next/head';

// components
import Header from '../components/header/header';
import AppHome from '../components/apphome';

// models
import {getMenu} from '../model/menu';
import {getLastPages} from '../model/page';

// styles
import styles from '../styles/pages/home.module.css';
import {getMediaLink, getServerImageEndpoint, getServeurImageMedia, isVideo} from '../utils/utils-serveur-image';
import {getMediaById, getSingleMedia} from '../model/media';
import LastNews from '../components/last-news';
import PageContent from '../components/page-template/commons/PageContent';
import {fetchWrapper} from '../utils/utils';
import {useState} from 'react';

// styles
const bannerStyles = {
    height: 360,
};

export default function Home({menu, page, articles}) {
    const router = useRouter();
    const {locale} = router;

    const [msg, setMsg] = useState(null);

    const newsLetterSubscribe = async e => {
        e.preventDefault();
        const {email} = e.target;
        let query = await fetchWrapper(`/api/adherent/subscribe?email=${email.value}`, null, 'GET');

        if (query.ok) {
            setMsg({message: 'Vous êtes maintenant inscrit'});
            e.target.reset();
            setTimeout(() => {
                setMsg(null);
            }, 2000);
        }
    };
    return (
        <div className={styles.container}>
            <Head>
                <title>Colline Saint Serge</title>
            </Head>

            {/* Header */}
            {menu && <Header menu={menu.data} currentLanguage={locale} />}

            {/* Page home */}
            <div className={styles.home}>
                {page ? (
                    <>
                        {page.bandeau && page.page != 'articles' && (
                            <div style={bannerStyles} className="">
                                {isVideo(page.bandeau.public_path) ? (
                                    <video
                                        className="block object-cover w-full h-full"
                                        src={getMediaLink(page.bandeau.public_path)}
                                        loop
                                        autoPlay
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        className="block object-cover w-full h-full"
                                        src={getMediaLink(page.bandeau.public_path)}
                                        alt=""
                                    />
                                )}
                            </div>
                        )}
                        {/* Content */}
                        <main className="max-w-screen-xl px-5 py-10 mx-auto bg-white">
                            <PageContent blocks={page.blocks} pageName={page.pageName} />
                        </main>
                    </>
                ) : (
                    <>
                        <header className={styles.header + ' relative'}>
                            <div className={styles.homeBandeauVideoContainer}>
                                <video
                                    className={styles.homeBandeauVideo}
                                    loop
                                    muted
                                    autoPlay
                                    playsInline
                                    src="/static/videos/bandeau-annonce.mp4"
                                ></video>
                            </div>
                        </header>
                        <AppHome currentLanguage={locale} />
                    </>
                )}
                <div className="flex flex-col items-center gap-2 my-2">
                    <div>Restez informé en recevant nos dernières actualitées par e-mail</div>
                    {msg && <div className="text-green-600">{msg.message}</div>}
                    <form className="flex flex-col w-1/2 gap-1" onSubmit={newsLetterSubscribe}>
                        <input type="text" name="email" placeholder="email" className="px-2 py-1 rounded-md" />
                        <button type="validate" className="px-2 py-1 text-white rounded-md bg-pred">
                            S'inscrire
                        </button>
                    </form>
                </div>
                <LastNews articles={articles} />
            </div>
        </div>
    );
}

export async function getStaticProps(context) {
    const menu = await getMenu(context.locale);
    let homePage = await getLastPages(context.locale, 'home', 1);

    // so that we can directly manipulate JS object in Components
    if (homePage && homePage[0]) {
        // const bandeau = await getServeurImageMedia(homePage[0].bandeau_id);
        const bandeau = await getMediaById(homePage[0].bandeau_id);
        homePage[0].bandeau = bandeau;
        homePage[0].blocks = JSON.parse(homePage[0].blocks);
    }

    let pages = await getLastPages(context.locale, 'articles', 9);

    if (pages) {
        for (let article of pages) {
            if (article.bandeau_id) {
                let media = await getSingleMedia(article.bandeau_id);
                article.image = getMediaLink(media.public_path);
            }
        }
    }

    return {
        props: {
            menu: menu,
            page: homePage ? homePage[0] : null,
            articles: pages,
        },
        revalidate: 10,
    };
}
