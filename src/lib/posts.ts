import { getCollection } from "astro:content";

// 公開済みの記事を、分野 → レベル → 番号順で返す
export async function getPublishedPosts() {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  const categories = await getCollection('categories')
  const idCategoryMap = new Map(categories.map((c) => [c.id, c]))
  const sorting = (a: (typeof posts)[number], b: (typeof posts)[number]) => {
    const categoryAB = [a,b].map((x) => idCategoryMap.get(x.data.category.id)) as (typeof categories)[number][]
    if(!categoryAB[0] || !categoryAB[1]) return 0
    const fieldsAB = categoryAB.map((c) => Number(c?.data.field.id))
    if(fieldsAB[0] !== fieldsAB[1]){
      return fieldsAB[0] - fieldsAB[1]
    }
    const levelAB = categoryAB.map((c) => c?.data.level)
    if(levelAB[0] !== levelAB[1]){
      return levelAB[0] - levelAB[1]
    }
    const numberAB = [a,b].map((x) => x.data.number)
    return numberAB[0] - numberAB[1]
  }
  posts.sort(sorting);
  return posts;
}
