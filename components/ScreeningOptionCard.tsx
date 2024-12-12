import React from 'react';
import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react';

type ScreenerAssistant = {
  address: string;
  name: string;
  description: string;
  iconPath: string;
  links: { name: string; url: string }[];
  assistantType: 'Screener';
  creatorAddress: string;
  configParams: { curatedListAddress: string };
};

const ScreeningOptionCard: React.FC<{ screener: ScreenerAssistant }> = ({
  screener,
}) => {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      flexDirection="row"
      alignItems="center"
      maxWidth="400px"
    >
      <Image
        boxSize="50px"
        borderRadius="full"
        src={screener.iconPath}
        alt={`${screener.name} Logo`}
      />
      <Box ml={4}>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          {screener.name}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={2}>
          By:{' '}
          <a
            href={screener.links[0].url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold', color: '#E53E3E' }}
          >
            Year One
          </a>
        </Text>
        <Badge
          colorScheme="blue"
          fontSize="0.8em"
          borderRadius="md"
          px={2}
          py={1}
          mb={2}
        >
          {screener.assistantType} Assistant
        </Badge>
        <Text fontSize="sm" color="gray.600">
          {screener.description}
        </Text>
      </Box>
    </Flex>
  );
};

export default ScreeningOptionCard;
