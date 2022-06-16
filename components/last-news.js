// libs
import Link from 'next/link';
import {useRouter} from 'next/router';
import {getProperDate} from '../lib/date';

export default function LastNews({articles}) {
    const router = useRouter();
    const {locale} = router;
    return (
        <div className="">
            <div className="container max-w-screen-xl bg-white sm:mx-auto">
                <div className="px-5 pt-4 sm:px-48">
                    <h2>{locale === 'fr' ? 'Actualités' : locale === 'en' ? 'News' : 'Новости'}</h2>
                    <div className="flex flex-wrap p-2">
                        {articles?.map(article => (
                            <div className="w-1/3 px-2" key={article.id}>
                                <Link href={`/${article.pageSlug}`}>
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
                        <div className="w-full m-3 text-center">
                            <Link href="/articles" locale={locale}>
                                <a className="px-2 py-3 text-white rounded cursor-pointer bg-pred">
                                    {locale === 'fr'
                                        ? 'Toutes les Actualités'
                                        : locale === 'en'
                                        ? 'All news'
                                        : 'Все новости'}
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
