import React from 'react';
import { Badge, Box, Flex, Image, Text, Link, Button } from '@chakra-ui/react';
import { ExecutiveAssistant, ScreenerAssistant } from '@/constants/CustomTypes';
import { getNetwork } from '@/utils/utils';

const AssistantSmallCard = ({
  assistant,
  includeLink = false,
}: {
  assistant: ExecutiveAssistant | ScreenerAssistant;
  includeLink?: boolean;
}) => {
  let link = '';
  if (includeLink) {
    const network = getNetwork(assistant.chainId);
    link += '/' + network.urlName;
    link += '/catalog';
    link +=
      assistant.assistantType === 'Screener'
        ? '/screener-assistants'
        : '/executive-assistants';
    link += `/${assistant.address}`;
  }

  return (
    <Flex
      border="1px solid #2C5765"
      borderRadius="10px"
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
      <Flex
        ml={4}
        flexDirection={'column'}
        justifyContent="center"
        alignContent="center"
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={1}>
            {assistant.name}
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
          <Badge
            fontSize="0.8em"
            borderRadius="md"
            border="1px solid"
            borderColor="uap.font"
            color="uap.font"
            bg="transparent"
            textTransform="none"
          >
            {assistant.assistantType} Assistant
          </Badge>
          <Text fontSize="sm" color="gray.600">
            {assistant.description}
          </Text>
        </Box>
        {includeLink && (
          <Button
            mt="2"
            as="a"
            href={link}
            colorScheme="orange"
            variant="solid"
            size="sm"
            width={'200px'}
          >
            View Details
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default AssistantSmallCard;
