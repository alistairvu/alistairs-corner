import { GetStaticProps } from 'next';

import Head from 'next/head';

import { Heading, Container, Text } from '@chakra-ui/react';
import { renderMetaTags } from 'react-datocms';
import { SWRConfig } from 'swr';

import GuestbookEntryList from '~/components/guestbook/GuestbookEntryList';
import GuestbookForm from '~/components/guestbook/GuestbookForm';
import request from '~/libs/datocms';
import { metaTagsFragment } from '~/libs/datocmsFragments';
import GuestbookService from '~/server/services/guestbook.service';

type GuestbookPageProps = {
  guestbookPage: GuestbookPage;
  site: Site;
  entries: GuestbookEntry[];
};

const GuestbookPage = ({
  entries,
  guestbookPage,
  site,
}: GuestbookPageProps) => (
  <>
    <Head>{renderMetaTags(guestbookPage.seo.concat(site.favicon))}</Head>

    <Container py={8}>
      <Heading as="h1" size="2xl" pb={2}>
        {guestbookPage.heading}
      </Heading>

      <Text fontSize="xl">{guestbookPage.description}</Text>

      <GuestbookForm
        errorHeading={guestbookPage.errorHeading}
        errorDescription={guestbookPage.errorDescription}
        successHeading={guestbookPage.successHeading}
        successDescription={guestbookPage.successDescription}
      />

      <SWRConfig
        value={{
          fallback: {
            '/api/guestbook': entries,
          },
        }}
      >
        <GuestbookEntryList />
      </SWRConfig>
    </Container>
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const datoPromise = request({
    query: `{
      guestbookPage {
        heading
        description
        successHeading
        successDescription
        errorHeading
        errorDescription
        seo: _seoMetaTags {
          ...metaTagsFragment
        }
      }
      site: _site {
        favicon: faviconMetaTags {
          ...metaTagsFragment
        }
      }
    }  
    ${metaTagsFragment}  
    `,
    preview: process.env.NODE_ENV === 'development',
  });

  const entriesPromise = new GuestbookService().get();

  const [entries, datoResponse] = await Promise.all([
    entriesPromise,
    datoPromise,
  ]);

  const { guestbookPage, site } = datoResponse;

  return {
    props: {
      entries,
      guestbookPage,
      site,
    },
  };
};

export default GuestbookPage;
