import { GetStaticProps } from 'next';

import Head from 'next/head';

import { Heading, Container } from '@chakra-ui/react';
import { renderMetaTags } from 'react-datocms';

import ContactForm from '~/components/contact/ContactForm';
import request from '~/libs/datocms';
import { metaTagsFragment } from '~/libs/datocmsFragments';
import { NextPageWithLayout } from '~/libs/nextTypes';

const ContactPage: NextPageWithLayout<{
  contactPage: ContactPage;
  site: Site;
}> = ({ contactPage, site }) => (
  <Container py={8}>
    <Head>{renderMetaTags(contactPage.seo.concat(site.favicon))}</Head>

    <Heading as="h1" size="2xl" pb={2}>
      {contactPage.heading}
    </Heading>

    <ContactForm
      errorHeading={contactPage.errorHeading}
      errorDescription={contactPage.errorDescription}
      successHeading={contactPage.successHeading}
      successDescription={contactPage.successDescription}
    />
  </Container>
);

export const getStaticProps: GetStaticProps = async () => {
  const { contactPage, site } = await request({
    query: `{
      contactPage {
        heading
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

  return { props: { contactPage, site }, revalidate: 12 };
};

export default ContactPage;
