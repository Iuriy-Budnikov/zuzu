const allPosts = import.meta.glob('../../*.{md,svx}');

let body = [];
for (let path in allPosts) {
  body.push(
    allPosts[path]().then(({ metadata }) => {
      return { path, metadata };
    })
  );
}

export const load = async ({ params }) => {
  const posts = await Promise.all(body);
  const tag = params.tag;

  const filteredPosts = posts.filter((post) => {
    return post.metadata.tags.includes(tag);
  });

  return {
    filteredPosts,
    tag
  };
};
