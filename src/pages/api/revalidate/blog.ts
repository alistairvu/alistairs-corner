import type { NextApiRequest, NextApiResponse } from 'next';

import request from '~/libs/datocms';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== process.env.NEXT_DATOCMS_API_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const { slug } = req.body;

  if (!slug) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  const tagsQuery = `query tagsQuery($slug: String) {
    blogPost(filter: {slug: {eq: $slug}}) {
      tags {
        title
      }
    }
  }
  `;

  const tagsQueryResponse: {
    blogPost: {
      tags: {
        title: string;
      }[];
    } | null;
  } = await request({ query: tagsQuery });

  if (!tagsQueryResponse.blogPost) {
    return res
      .status(404)
      .json({ message: `Post with slug ${slug} not found` });
  }

  const postPromise = res.unstable_revalidate(`/blog/${slug}`);
  const blogPagePromise = res.unstable_revalidate(`/blog`);

  const tagsList = tagsQueryResponse.blogPost.tags.map((tag) => tag.title);
  const tagsPromises = tagsList.map((tag) =>
    res.unstable_revalidate(`/tag/${tag}`)
  );

  try {
    await Promise.all([postPromise, blogPagePromise, ...tagsPromises]);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
};

export default handler;
