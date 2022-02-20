import { Airtable, AirtableRecord } from 'airtable-lite';
import { object, string, assert } from 'superstruct';

import { email } from '~/libs/superstructTypes';

const ContactInfo = object({
  name: string(),
  email: email(),
  message: string(),
});

type CreateContactInfoResponse =
  | {
      success: true;
      data: AirtableRecord<ContactEntry>;
    }
  | {
      success: false;
      status: number;
      err: any;
    };

export default class ContactService {
  contacts: Airtable<ContactEntry>;

  constructor() {
    this.contacts = new Airtable<ContactEntry>(
      `${process.env.AIRTABLE_API_KEY}`,
      `${process.env.AIRTABLE_BASE}`,
      'Contact'
    );
  }

  async create(contactInformation: any): Promise<CreateContactInfoResponse> {
    try {
      assert(contactInformation, ContactInfo);
    } catch (err) {
      return {
        success: false,
        status: 400,
        err,
      };
    }

    try {
      const data = await this.contacts.create(contactInformation);
      return {
        success: true,
        data,
      };
    } catch (err) {
      return {
        success: false,
        status: 500,
        err,
      };
    }
  }
}
