import { getCollection } from "astro:content";

// 公開済みの記事を、新しい順で返す
export async function getPublishedPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return posts;
}
