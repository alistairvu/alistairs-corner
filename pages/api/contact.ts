import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  error?: any;
};

const sendContactInformation = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const contactInformation = req.body;

  const data = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/contact`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: contactInformation,
          },
        ],
      }),
      method: 'POST',
    }
  ).then((res) => res.json());

  if (data.error) {
    return res.send({ success: false, error: data.error });
  }

  return res.send({ success: true });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return sendContactInformation(req, res);
  }

  return res.send({ message: 'Route not found' });
};

export default handler;
