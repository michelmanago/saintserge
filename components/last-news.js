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
                <div className="px-5 pt-4">
                    <h2>{locale === 'fr' ? 'Actualités' : locale === 'en' ? 'News' : 'Новости'}</h2>
                    <div className="flex flex-wrap p-2">
                        {articles
                            ?.filter(a => !a.draft)
                            .map(article => (
                                <>
                                    <div className="w-full px-2 mt-2 sm:w-1/2 md:w-1/3" key={article.id}>
                                        <Link href={`/${article.pageSlug}`}>
                                            <a className="flex flex-col gap-1">
                                                {article.image ? (
                                                    <img
                                                        className="object-cover mx-auto"
                                                        style={{aspectRatio: '4 / 3'}}
                                                        src={`${article.image}`}
                                                    />
                                                ) : null}
                                                <div className="font-serif text-xl font-bold sm:text-2xl">
                                                    {article.pageName}
                                                </div>
                                                <div className="inline-block text-sm">
                                                    {locale === 'fr'
                                                        ? 'Publié le'
                                                        : locale === 'en'
                                                        ? 'Published'
                                                        : 'Опубликовано'}{' '}
                                                    {getProperDate(article.created_at)}
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                </>
                            ))}
                        <div className="flex flex-row justify-center w-full mt-2">
                            <Link href="/articles" locale={locale}>
                                <a className="p-2 text-white rounded cursor-pointer bg-pred">
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
