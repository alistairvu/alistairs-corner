import { ListItem, Text, UnorderedList } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';

const newTheme = {
  p: (props: any) => {
    const { children } = props;
    return (
      <Text mb={2} fontSize="12px">
        {children}
      </Text>
    );
  },

  ul: (props: any) => {
    const { children } = props;
    return <UnorderedList>{children}</UnorderedList>;
  },

  li: (props: any) => {
    const { children } = props;
    return <ListItem>{children}</ListItem>;
  },
};

const CommonMarkdown = ({ markdown }: { markdown: string }) => (
  <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
    {markdown}
  </ReactMarkdown>
);

export default CommonMarkdown;
