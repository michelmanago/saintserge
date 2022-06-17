import Link from 'next/link';
import {useRouter} from 'next/router';
import Header from '../../../components/header/header';
import {getProperDate} from '../../../lib/date';
import {getSingleMedia} from '../../../model/media';
import {getMenu} from '../../../model/menu';
import {getAllPages} from '../../../model/page';
import {getMediaLink} from '../../../utils/utils-serveur-image';

export default function Articles({menu, articles}) {
    const router = useRouter();
    const {locale} = router;
    return (
        <div>
            {/* Header */}
            {menu && <Header menu={menu.data} currentLanguage={locale} />}
            <main className="container max-w-screen-xl px-5 pt-4 bg-white sm:px-48 sm:mx-auto">
                <div className="flex mt-1 place-content-center">
                    <Link href="/admin/page/create?type=articles">
                        <a>
                            <button className="w-48 py-3 text-white rounded bg-pred">Créer</button>
                        </a>
                    </Link>
                </div>
                <div className="flex flex-wrap p-2">
                    {articles?.map(article => (
                        <div className="w-1/3 px-2" key={article.id}>
                            <Link href={`/admin/page/${article.id}`}>
                                <a>
                                    <div className="relative">
                                        <img className="mx-auto max-h-56" src={`${article.image}`} />
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
