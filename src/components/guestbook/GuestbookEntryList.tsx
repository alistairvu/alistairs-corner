import useSWR from 'swr';

import GuestbookEntry from './GuestbookEntry';

const guestbookFetcher = async () =>
  fetch('/api/guestbook').then((res) => res.json());

const GuestbookEntryList = () => {
  const { data } = useSWR<GuestbookEntry[]>('/api/guestbook', guestbookFetcher);

  if (!data) {
    return null;
  }

  return (
    <>
      {data.map((entry) => (
        <GuestbookEntry data={entry} key={entry.id} />
      ))}
    </>
  );
};

export default GuestbookEntryList;
