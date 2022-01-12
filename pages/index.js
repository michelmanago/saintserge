// libs
import { useRouter } from "next/router";
import Head from "next/head";

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
import LastNews from "../components/last-news";

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
        <LastNews articles={articles} />
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const menu = await getMenu(context.locale);

  let pages = await getLastPages(context.defaultLocale, "articles", 9);

  if (pages) {
    for (let article of pages) {
      if (article.bandeau_id) {
        let media = await getSingleMedia(article.bandeau_id);
        article.image = getMediaLink(media.public_path);
      }
    }
  }

  //console.log("articles: ", pages);

  return {
    props: {
      menu: menu,
      articles: pages,
    },
    revalidate: 10,
  };
}
