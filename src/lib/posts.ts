import { getCollection } from 'astro:content';

// 公開済みの記事を、新しい順で返す
export async function getPublishedPosts() {
  return await getCollection("posts", ({data}) => !data.draft)
}