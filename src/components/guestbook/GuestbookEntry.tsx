import { Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

type GuestbookEntryProps = {
  data: GuestbookEntry;
};

const GuestbookEntry = ({ data }: GuestbookEntryProps) => (
  <Box my={8}>
    <Text fontSize="xl">{data.message}</Text>
    <Text color="gray.600">{data.name}</Text>
    <Text color="gray.600">
      {format(new Date(data.timestamp), 'd MMMM Y, kk:mm')}
    </Text>
  </Box>
);

export default GuestbookEntry;
