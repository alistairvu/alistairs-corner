/* eslint-disable react/no-unstable-nested-components */
import { Heading, Text, Box } from '@chakra-ui/react';
import {
  isHeading,
  isParagraph,
  isCode,
  isBlockquote,
  renderRule,
} from 'datocms-structured-text-utils';
import { StructuredText } from 'react-datocms';
import { CopyBlock, atomOneDark } from 'react-code-blocks';

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
          <Heading size={SIZE_MAPPING[node.level]} key={key} py={2}>
            {children}
          </Heading>
        );
      }),

      renderRule(isParagraph, ({ children, key }) => (
        <Text fontSize="xl" key={key} py={1}>
          {children}
        </Text>
      )),

      renderRule(isCode, ({ node, key }) => (
        <Box my={2} key={key}>
          <CopyBlock
            text={node.code}
            language={node.language}
            theme={atomOneDark}
          />
        </Box>
      )),

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
    ]}
  />
);

export default CommonStructuredText;
