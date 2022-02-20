import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== process.env.NEXT_DATOCMS_API_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await Promise.all([
      res.unstable_revalidate('/about'),
      res.unstable_revalidate('/contact'),
    ]);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send('Error revalidating');
  }
};

export default handler;
