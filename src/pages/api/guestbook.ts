import type { NextApiRequest, NextApiResponse } from 'next';

import GuestbookService from '~/server/services/guestbook.service';

const getEntries = async (res: NextApiResponse) => {
  const data = await new GuestbookService().get();

  res.send(data);
};

const createEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const entryData = req.body;
  const guestbookService = new GuestbookService();

  const response = await guestbookService.create(entryData);

  if (!response.success) {
    return res
      .status(response.status)
      .send({ success: false, error: response.err });
  }

  try {
    await res.unstable_revalidate('/guestbook');
  } catch (err) {
    return res.status(500).send({
      success: false,
      error: {
        message: 'Error while revalidating',
      },
    });
  }

  return res.send({ success: true, data: response.data });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getEntries(res);
  }

  if (req.method === 'POST') {
    return createEntry(req, res);
  }

  return res.send({ message: 'Route not found' });
};

export default handler;
