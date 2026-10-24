import { getCollection, type CollectionEntry } from "astro:content";

type Post = CollectionEntry<"posts">;

// 公開済みの記事を、分野 → レベル → 番号順で返す
export async function getPublishedPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const categories = await getCollection("categories");
  const idCategoryMap = new Map(categories.map((c) => [c.id, c]));
  const getCategory = (post: Post) => {
    const category = idCategoryMap.get(post.data.category.id);
    if (!category)
      throw new Error(`カテゴリーが見つかりません: ${post.data.category.id}`);
    return category;
  };
  posts.sort((a, b) => {
    const ca = getCategory(a);
    const cb = getCategory(b);
    return (
      Number(ca.data.field.id) - Number(cb.data.field.id) ||
      ca.data.level - cb.data.level ||
      a.data.number - b.data.number
    );
  });
  return posts;
}

//postに対応する記事のURLを取得する
export function getPostUrl(post: Post) {
  return `/posts/${post.data.category.id}/${post.data.number}/`;
}
