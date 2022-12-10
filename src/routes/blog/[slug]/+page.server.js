import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
  try {
    const post = await import(`../${params.slug}.md`);
    return {
      html: post.default.render().html,
      meta: { ...post.metadata, slug: params.post }
    };
  } catch (err) {
    throw error(404, err.message);
  }
};
