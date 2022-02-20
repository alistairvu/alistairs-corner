import type { NextApiRequest, NextApiResponse } from 'next';

import { AirtableRecord } from 'airtable-lite';

import ContactService from '~/server/services/contact.service';

type CreateContactData =
  | {
      success: false;
      error: any;
    }
  | {
      success: true;
      data: AirtableRecord<{
        name: string;
        email: string;
        message: string;
      }>;
    };

const createContactInformation = async (
  req: NextApiRequest,
  res: NextApiResponse<CreateContactData>
) => {
  const contactInformation = req.body;
  const contactService = new ContactService();

  const response = await contactService.create(contactInformation);

  if (!response.success) {
    return res
      .status(response.status)
      .send({ success: false, error: response.err });
  }

  return res.send({ success: true, data: response.data });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return createContactInformation(req, res);
  }

  return res.send({ message: 'Route not found' });
};

export default handler;
