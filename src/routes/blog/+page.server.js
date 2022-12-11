import { error } from '@sveltejs/kit';
import apiClient from '$utils/apiClient/apiCmsClient';

export const load = async () => {
  const body = JSON.stringify({
    query: `{
      posts {
        title
        slug
        date
        tags {
          name
        }
      }
    }`
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
    posts
  };
};
