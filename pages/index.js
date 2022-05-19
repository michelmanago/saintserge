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
import {getSingleMedia} from '../model/media';
import LastNews from '../components/last-news';
import PageContent from '../components/page-template/commons/PageContent';

// styles
const bannerStyles = {
    height: 360,
};

export default function Home({menu, page, articles}) {
    const router = useRouter();
    const {locale} = router;

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
                        <main className="max-w-screen-xl px-10 py-10 mx-auto bg-white">
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
        const bandeau = await getServeurImageMedia(homePage[0].bandeau_id);
        homePage[0].bandeau = bandeau;
        homePage[0].blocks = JSON.parse(homePage[0].blocks);
    }

    let pages = await getLastPages(context.defaultLocale, 'articles', 9);

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
