import React from 'react';
import { Flex, Image, Text, VStack, HStack } from '@chakra-ui/react';

type ExecutiveAssistant = {
  address: string;
  name: string;
  description: string;
  iconPath: string;
  links: { name: string; url: string }[];
  assistantType: 'Executive';
  creatorAddress: string;
  supportedTransactionTypes: string[];
  configParams: { destinationAddress: string };
};

const SupportedTransactions: React.FC<{ assistant: ExecutiveAssistant }> = ({
  assistant,
}) => {
  return (
    <Flex
      p={4}
      alignItems="center"
      justifyContent="space-between"
      maxWidth="400px"
    >
      <Text fontWeight="bold">Supported Transactions</Text>
      <HStack spacing={4}>
        {assistant.supportedTransactionTypes.map((type, index) => (
          <VStack key={index}>
            <Image
              src="https://via.placeholder.com/24"
              alt="Transaction Icon"
              boxSize="24px"
            />
            <Text fontSize="sm">{type}</Text>
          </VStack>
        ))}
      </HStack>
    </Flex>
  );
};

export default SupportedTransactions;
