import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// process.cwd()＝ルートディレクトリ
const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // ファイル名(id)
    const id = fileName.replace(/\.md$/, "");

    // mdファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    // idとデータを返す

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData;
}

// getStaticPathで返すために使うpathを取得する
export function getAllPostsIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        // 動的パスのidに一致させる
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
  /*
  [
    {
      params: {
        id: "ssg-ssr",
      }
    },
    {
      params: {
        id: "next-react",
      }
    },
    ...
  ]
  */
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  // matterResult.data // メタデータ
  // matterResult.content // 本文(文字列)

  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHTML = blogContent.toString();

  return {
    id, 
    blogContentHTML,
    ...matterResult.data,
  }

}