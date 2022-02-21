import { process } from '$lib/utils/markdown';
import fs from 'fs';
import dayjs from 'dayjs';

export function get() {
  const posts = fs
    .readdirSync(`src/posts`)
    .filter((fileName) => /.+\.md$/.test(fileName))
    .map((fileName) => {
      const { metadata } = process(`src/posts/${fileName}`);
      return {
        metadata,
        slug: fileName.slice(0, -3)
      };
    });
  // sort the posts by create date.
  posts.sort(
    (a, b) => dayjs(a.metadata.date, 'MMM D, YYYY') - dayjs(b.metadata.date, 'MMM D, YYYY')
  );
  const body = JSON.stringify(posts);

  return {
    body
  };
}
