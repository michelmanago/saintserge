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
import Popup from 'reactjs-popup';
import IconClose from '../components/icons/IconClose';

// styles
const bannerStyles = {
    height: 360,
};

// styles
const contentStyles = {
    width: '50%',
    height: '20%',
    overflow: 'auto',
    borderRadius: '.2em',
    background: '#fff',
    boxShadow: '0 0 2px rgba(0, 0, 0, .2)',
};

export default function Home({menu, page, articles}) {
    const router = useRouter();
    const {locale} = router;

    const [isOpen, setIsOpen] = useState(false);
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
        // <div className={styles.container}>
        <div className="container max-w-screen-xl sm:mx-auto bg-pwhite">
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

                <LastNews articles={articles} />
                <div className="container flex flex-col items-center max-w-screen-xl gap-2 py-2 bg-white sm:mx-auto">
                    <button className="px-2 py-1 text-white rounded-md bg-pred" onClick={() => setIsOpen(true)}>
                        S'inscrire
                    </button>
                </div>

                <Popup
                    open={isOpen}
                    onClick={() => setIsOpen(!isOpen)}
                    contentStyle={contentStyles}
                    onClose={() => setIsOpen(false)}
                >
                    <div className="flex flex-col items-center w-full gap-2 py-2 bg-white rounded">
                        {/* Close */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute text-gray-700 top-1 right-1 hover:text-gray-800"
                        >
                            <IconClose />
                        </button>
                        <div>S'inscrire à la newsletter</div>
                        {msg && <div className="text-green-600">{msg.message}</div>}
                        <form className="flex flex-col w-1/2 gap-1" onSubmit={newsLetterSubscribe}>
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                className="px-2 py-1 border rounded-md"
                            />
                            <button type="validate" className="px-2 py-1 text-white rounded-md bg-pred">
                                S'inscrire
                            </button>
                        </form>
                    </div>
                </Popup>
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
