import { error } from '@sveltejs/kit';
import apiClient from '$utils/apiClient/apiCmsClient';

export const load = async ({ params }) => {
  const tag = params.tag;
  const body = JSON.stringify({
    query: `query GetPostsByTag($tag: String!) {
      posts(where: {tags_some: {name: $tag}}) {
        slug
        title
      }
    }`,
    variables: {
      tag
    }
  });

  const {
    data: {
      data: { posts }
    }
  } = await apiClient.post('master', body);

  if (!posts?.length) {
    throw error(404);
  }

  return {
    posts,
    tag
  };
};
