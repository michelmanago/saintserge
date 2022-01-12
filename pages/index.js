// libs
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getProperDate } from "../lib/date";

// components
import Header from "../components/header/header";
import AppHome from "../components/apphome";

// models
import { getMenu } from "../model/menu";
import { getLastPages } from "../model/page";

// styles
import styles from "../styles/pages/home.module.css";
import {
  getMediaLink,
  getServerImageEndpoint,
} from "../utils/utils-serveur-image";
import { getSingleMedia } from "../model/media";

export default function Home({ menu, articles }) {
  const router = useRouter();
  const { locale } = router;

  return (
    <div className={styles.container}>
      <Head>
        <title>Colline Saint Serge</title>
      </Head>

      {/* Header */}
      {menu && <Header menu={menu.data} />}

      {/* Page home */}
      <div className={styles.home}>
        <header className={styles.header + " relative"}>
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

        <div className="bg-pwhite">
          <div className="container max-w-screen-xl bg-white sm:mx-auto">
            <h2 className="px-5 pt-4 sm:px-48">Actualités</h2>
            <div className="flex flex-wrap p-2">
              {articles?.map((article) => (
                <div className="w-1/3 px-2" key={article.id}>
                  <Link href={`/${article.pageSlug}`}>
                    <a>
                      <div className="relative">
                        <img
                          className="mx-auto max-h-56"
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
              {/*<div className="w-full mt-3 text-center">
                        <Link href="/articles">
                            <a className='px-2 py-3 text-white cursor-pointer bg-pgold'>Toutes les Actualités</a>
                        </Link>
                                        </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const menu = await getMenu(context.locale);

  let pages = await getLastPages(context.defaultLocale, "articles", 9);

  for (let article of pages) {
    if (article.bandeau_id) {
      let media = await getSingleMedia(article.bandeau_id);
      article.image = getMediaLink(media.public_path);
    }
  }

  console.log("articles: ", pages);

  return {
    props: {
      menu: menu,
      articles: pages,
    },
    revalidate: 10,
  };
}
