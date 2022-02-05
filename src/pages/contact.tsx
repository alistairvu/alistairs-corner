import { useState } from 'react';

import { GetStaticProps } from 'next';

import Head from 'next/head';

import {
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Text,
  Heading,
  Button,
  FormErrorMessage,
  Box,
  Container,
} from '@chakra-ui/react';
import { validate as validateEmail } from 'isemail';
import { renderMetaTags } from 'react-datocms';
import { useForm } from 'react-hook-form';

import request from '~/lib/datocms';
import { metaTagsFragment } from '~/lib/datocms_fragments';
import { NextPageWithLayout } from '~/lib/next_types';

const ContactPage: NextPageWithLayout<{
  contactPage: ContactPage;
  site: Site;
}> = ({ contactPage, site }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ContactFormInput>();
  const [isSubmitError, setIsSubmitError] = useState(false);

  const handleSendData = async (data: ContactFormInput) => {
    setIsSubmitError(false);
    const response = await fetch('/api/contact', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'POST',
    }).then((res) => res.json());

    if (!response.success) {
      setIsSubmitError(true);
      throw new Error(response.message);
    }
  };

  return (
    <Container py={8}>
      <Head>{renderMetaTags(contactPage.seo.concat(site.favicon))}</Head>

      <Heading as="h1" size="2xl" pb={2}>
        {contactPage.heading}
      </Heading>

      {!isSubmitSuccessful && isSubmitError && (
        <Box
          py={2}
          px={4}
          backgroundColor="red.100"
          borderRadius="md"
          shadow="md"
          color="red.600"
        >
          <Heading size="lg">{contactPage.errorHeading}</Heading>
          <Text>{contactPage.errorDescription}</Text>
        </Box>
      )}

      {isSubmitSuccessful ? (
        <Box
          py={2}
          px={4}
          backgroundColor="green.100"
          borderRadius="md"
          shadow="md"
          color="green.600"
        >
          <Heading size="lg">{contactPage.successHeading}</Heading>
          <Text>{contactPage.successDescription}</Text>
        </Box>
      ) : (
        <form onSubmit={handleSubmit(handleSendData)}>
          <FormControl py={2} isInvalid={errors.name !== undefined}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              {...register('name', { required: 'You must enter a name' })}
            />
            {errors.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl py={2} isInvalid={errors.email !== undefined}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="text"
              {...register('email', {
                required: 'You must enter an email',
                validate: (val) =>
                  validateEmail(val) || 'Please enter a valid email',
              })}
            />
            {errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl py={2} isInvalid={errors.message !== undefined}>
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea
              id="message"
              {...register('message', { required: 'Please send a message' })}
            />
            {errors.message && (
              <FormErrorMessage>{errors.message.message}</FormErrorMessage>
            )}
          </FormControl>

          <Button
            colorScheme="blackAlpha"
            backgroundColor="gray.900"
            py={2}
            type="submit"
            isLoading={isSubmitting}
            loadingText="sending..."
          >
            send
          </Button>
        </form>
      )}
    </Container>
  );
};

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
