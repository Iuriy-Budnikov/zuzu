import { error } from '@sveltejs/kit';
import apiClient from '$utils/apiClient/apiCmsClient';

export const load = async ({ params }) => {
  const slug = params.slug;
  const body = JSON.stringify({
    query: `query GetPostById($slug: String!) {
      post(where: {slug: $slug}) {
        id
        title
        date
        content {
          html
        }
      }
    }`,
    variables: {
      slug
    }
  });

  const {
    data: {
      data: { post }
    }
  } = await apiClient.post('master', body);

  if (!post) {
    throw error(404);
  }
  return {
    post
  };
};
