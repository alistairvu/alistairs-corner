import type { NextApiRequest, NextApiResponse } from 'next';

import { Airtable } from 'airtable-lite';
import { validate as validateEmail } from 'isemail';
import { object, string, define, assert } from 'superstruct';

const contacts = new Airtable<{ name: string; email: string; message: string }>(
  `${process.env.AIRTABLE_API_KEY}`,
  `${process.env.AIRTABLE_BASE}`,
  'Contact'
);

type Data = {
  success: boolean;
  error?: any;
  data?: any;
};

const email = () =>
  define<string>('email', (val) => validateEmail(String(val)));

const ContactInfo = object({
  name: string(),
  email: email(),
  message: string(),
});

const sendContactInformation = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const contactInformation = req.body;

  try {
    assert(contactInformation, ContactInfo);
  } catch (err) {
    return res.status(400).send({ success: false, error: err });
  }

  try {
    const data = await contacts.create(contactInformation);
    return res.send({ success: true, data });
  } catch (err) {
    return res.status(500).send({ success: false, error: err });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return sendContactInformation(req, res);
  }

  return res.send({ message: 'Route not found' });
};

export default handler;
