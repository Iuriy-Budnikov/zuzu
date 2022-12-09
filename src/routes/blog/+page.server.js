const allPosts = import.meta.glob('./*.{md,svx}');

let body = [];
for (let path in allPosts) {
  body.push(
    allPosts[path]().then(({ metadata }) => {
      return { path, metadata };
    })
  );
}
export const load = async () => {
  const posts = await Promise.all(body);

  return {
    posts
  };
};
