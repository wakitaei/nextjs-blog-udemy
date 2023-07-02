// import Layout from "@/components/Layout";
// import { getAllPostsIds } from "@/lib/post";

import Layout from "../../components/Layout";
import { getAllPostsIds, getPostData } from "../..//lib/post";
import utilStyles from "../../styles/utils.module.css";
import Head from "next/head";

export async function getStaticPaths() {
  const paths = getAllPostsIds();

  // console.log(paths);
  // [
  //   { params: { id: 'pre-rendering' } },
  //   { params: { id: 'prerendering-about' } },
  //   { params: { id: 'react-next' } },
  //   { params: { id: 'ssg-ssr' } }
  // ]

  return {
    paths,
    // false pathsに存在しない場合404
    // trueは存在しなければ生成する、blockingはtrueと同じく生成するが読み込み中がなく遷移させる
    fallback: false,
  }
}

// Error: getStaticPaths was added without a getStaticProps in /posts/[id]. Without getStaticProps, getStaticPaths does nothing
// getStaticPropsとセットで必要

// remarkが非同期、getPostData、getStaticPropsも非同期
export async function getStaticProps({ params }) {
  // console.log(context);
  // {
  //   params: { id: 'prerendering-about' },
  //   locales: undefined,
  //   locale: undefined,
  //   defaultLocale: undefined
  // }
  
  // params URLのid
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    }
  };
}

// getStaticPaths SSGを行う動的パスを決める
// getStaticProps リクエストされる1つの動的パスから動的データをpropsとして取得
// Post 関数コンポーネントの引数でpropsを受け取る

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingX1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
}
