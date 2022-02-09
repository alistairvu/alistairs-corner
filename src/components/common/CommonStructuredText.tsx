/* eslint-disable react/no-unstable-nested-components */
import {
  Heading,
  Text,
  Box,
  Link,
  UnorderedList,
  OrderedList,
  ListItem,
  Code,
} from '@chakra-ui/react';
import {
  isHeading,
  isParagraph,
  isCode,
  isBlockquote,
  renderRule,
  isLink,
  isList,
  isListItem,
} from 'datocms-structured-text-utils';
import { StructuredText, Image as DatoImage } from 'react-datocms';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { isBlogImageRecord } from '~/lib/datocms_types';
import bannerStyles from '~/styles/banner.module.css';

type CommonStructuredTextProps = {
  content: any;
};

const CommonStructuredText = ({ content }: CommonStructuredTextProps) => (
  <StructuredText
    data={content}
    customRules={[
      renderRule(isHeading, ({ node, children, key }) => {
        const SIZE_MAPPING = {
          1: '2xl',
          2: 'xl',
          3: 'lg',
          4: 'md',
          5: 'sm',
          6: 'xs',
        };

        return (
          <Heading
            size={SIZE_MAPPING[node.level]}
            key={key}
            my={6 - node.level}
          >
            {children}
          </Heading>
        );
      }),

      renderRule(isParagraph, ({ children, key }) => (
        <Text fontSize="lg" key={key} my={4}>
          {children}
        </Text>
      )),

      renderRule(isCode, ({ node, key }) => {
        if (node.language) {
          return (
            <Box my={2} key={key}>
              <SyntaxHighlighter
                language={node.language}
                style={atomOneDark}
                customStyle={{ padding: '0.8rem' }}
              >
                {node.code}
              </SyntaxHighlighter>
            </Box>
          );
        }

        return <Code key={key}>{node.code}</Code>;
      }),

      renderRule(isBlockquote, ({ key, children }) => (
        <Box
          px={4}
          my={4}
          borderLeftWidth={4}
          width="100%"
          borderLeftColor="gray.600"
          key={key}
        >
          <Text as="i">{children}</Text>
        </Box>
      )),

      renderRule(isLink, ({ node, key, children }) => {
        const meta = node.meta
          ? node.meta.reduce(
              (acc, val) => ({ ...acc, [val.id]: val.value }),
              {}
            )
          : {};

        return (
          <Link color="cyan.700" href={node.url} {...meta} key={key}>
            {children}
          </Link>
        );
      }),

      renderRule(isList, ({ node, key, children }) => {
        switch (node.style) {
          case 'bulleted': {
            return (
              <UnorderedList key={key} my={2}>
                {children}
              </UnorderedList>
            );
          }

          case 'numbered': {
            return (
              <OrderedList key={key} my={2}>
                {children}
              </OrderedList>
            );
          }

          default: {
            return null;
          }
        }
      }),

      renderRule(isListItem, ({ key, children }) => (
        <ListItem key={key} py={0}>
          {children}
        </ListItem>
      )),
    ]}
    renderBlock={({ record }) => {
      if (isBlogImageRecord(record)) {
        return (
          <Box width="100%" align="center" my={2}>
            <Box mx={2} maxWidth={{ base: '100%', md: '60%' }}>
              <Box shadow="md" rounded="md">
                <DatoImage
                  data={record.image.responsiveImage}
                  className={bannerStyles.image}
                />
              </Box>
              <Text mt={3} fontSize="md" color="gray.700">
                {record.caption}
              </Text>
            </Box>
          </Box>
        );
      }

      return null;
    }}
  />
);

export default CommonStructuredText;
