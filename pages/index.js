import Link from "next/link";
import Layout, { siteTitle } from "../components/Layout";
import styles from "../styles/Home.module.css";
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";
import Head from "next/head";
// import Image from "next/image";

// SSGの場合
export async function getStaticProps() {
  // id, title, date, thumbnail
  const allPostsData = getPostsData();
  // サーバ側のログ
  // console.log(allPostsData);
  // [
  //   {
  //     id: 'pre-rendering',
  //     title: 'プリレンダリングの2つの形態',
  //     date: '2022-02-22',
  //     thumbnail: '/images/thumbnail02.jpg'
  //   },
  //   ・・・

  // 取得したデータをHomeコンポーネントに渡す必要がある
  return {
    props: {
      allPostsData,
    },
  };
}

// SSRの場合
// context ユーザのリクエストの情報
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  // mainのコンポーネントをLayoutのpropsとして渡す
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>プロフィール</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                {/* thumbnail: '/images/thumbnail04.jpg'なのでそのまま設定 */}
                <img
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                  alt=""
                />
                {/* <Image src={`${thumbnail}`} width={950} height={400} className={styles.thumbnailImage} alt="" /> */}
              </Link>

              {/* Unhandled Runtime Error
              Error: Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
              Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor */}
              <Link legacyBehavior href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
