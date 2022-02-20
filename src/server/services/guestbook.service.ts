import { Airtable, AirtableDirection } from 'airtable-lite';
import { object, string, assert } from 'superstruct';

import { email } from '~/libs/superstructTypes';

const GuestbookTableName =
  process.env.NODE_ENV === 'production' ? 'Guestbook' : 'Guestbook:Dev';

const GuestbookEntry = object({
  name: string(),
  email: email(),
  message: string(),
});

type AddGuestbookEntryResponse =
  | {
      success: true;
      data: GuestbookEntry;
    }
  | {
      success: false;
      status: number;
      err: any;
    };

export default class GuestbookService {
  guestbook: Airtable<GuestbookEntry>;

  constructor() {
    this.guestbook = new Airtable<GuestbookEntry>(
      `${process.env.AIRTABLE_API_KEY}`,
      `${process.env.AIRTABLE_BASE}`,
      GuestbookTableName
    );
  }

  async get(): Promise<GuestbookEntry[]> {
    const { records } = await this.guestbook.select({
      sort: [{ field: 'timestamp', direction: AirtableDirection.Descending }],
    });

    const data = records
      .map(({ id, fields }) => ({ ...fields, id }))
      .filter((record) => !record.toDelete);

    return data;
  }

  async create(guestbookEntry: any): Promise<AddGuestbookEntryResponse> {
    try {
      assert(guestbookEntry, GuestbookEntry);
    } catch (err) {
      return {
        success: false,
        status: 400,
        err,
      };
    }

    try {
      const { id, fields } = await this.guestbook.create(guestbookEntry);

      const data = { ...fields, id };

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
