import Link from 'next/link';
import {useRouter} from 'next/router';
import Header from '../components/header/header';
import LastNews from '../components/last-news';
import {getProperDate} from '../lib/date';
import {getSingleMedia} from '../model/media';
import {getMenu} from '../model/menu';
import {getAllPages} from '../model/page';
import {getMediaLink} from '../utils/utils-serveur-image';

export default function Articles({menu, articles}) {
    const router = useRouter();
    const {locale} = router;
    return (
        <div>
            {/* Header */}
            {menu && <Header menu={menu.data} currentLanguage={locale} />}
            <main className="container max-w-screen-xl px-5 pt-4 bg-white sm:px-48 sm:mx-auto">
                <h2>{locale === 'fr' ? 'Actualités' : locale === 'en' ? 'News' : 'Новости'}</h2>
                <div className="flex flex-wrap p-2">
                    {articles
                        ?.filter(a => !a.draft)
                        .map(article => (
                            <div className="w-1/3 px-2" key={article.id}>
                                <Link href={`/${article.pageSlug}`}>
                                    <a>
                                        <div className="relative">
                                            <img
                                                className="object-cover mx-auto max-h-56"
                                                style={{aspectRatio: '4 / 3'}}
                                                src={`${article.image}`}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="inline-block">{article.pageName}</h3>
                                            <div className="inline-block mx-2 text-sm">
                                                {getProperDate(article.created_at)}
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    const menu = await getMenu(context.locale);
    let articles = await getAllPages(context.locale, 'articles');
    if (articles) {
        for (let article of articles) {
            if (article.bandeau_id) {
                let media = await getSingleMedia(article.bandeau_id);
                article.image = getMediaLink(media.public_path);
            }
        }
    }
    return {props: {menu, articles}};
}
