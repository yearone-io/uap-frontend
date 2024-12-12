import React from 'react';
import { Box, Flex, Image, Text, Badge } from '@chakra-ui/react';

type Link = {
  name: string;
  url: string;
};

type ExecutiveAssistant = {
  address: string;
  name: string;
  description: string;
  iconPath: string;
  links: Link[];
  assistantType: 'Executive';
  creatorAddress: string;
  supportedTransactionTypes: string[];
  configParams: { destinationAddress: string };
};

const AssistantInfo: React.FC<{ assistant: ExecutiveAssistant }> = ({
  assistant,
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
        src={assistant.iconPath}
        alt={`${assistant.name} Logo`}
      />
      <Box ml={4}>
        <Flex alignItems="center" flexWrap="nowrap">
          <Text fontSize="lg" fontWeight="bold" mb={1}>
            {assistant.name}
          </Text>
          <Badge colorScheme="orange" fontSize="0.8em" borderRadius="md">
            {assistant.assistantType} Assistant
          </Badge>
        </Flex>
        <Text fontSize="sm" color="gray.600">
          {assistant.description}
        </Text>
        <Text fontSize="sm" color="gray.600" mb={2}>
          By:{' '}
          <a
            href={assistant.links[0].url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold', color: '#E53E3E' }}
          >
            Year One
          </a>
        </Text>
      </Box>
    </Flex>
  );
};

export default AssistantInfo;
