import React from 'react';
import { Box, Button, Flex, Text, VStack, HStack } from '@chakra-ui/react';

const URDSetup: React.FC = () => {
  return (
    <Box textAlign="center" maxWidth="600px" mx="auto" mt={8}>
      {/* Header Text */}
      <Text fontSize="lg" fontWeight="semibold" mb={4}>
        In order to engage an assistant you must first install the Universal
        Assistant Protocol on your{' '}
        <span role="img" aria-label="device">
          💻
        </span>
      </Text>

      {/* Instruction List */}
      <VStack spacing={6} align="stretch">
        {/* Instruction 1 */}
        <HStack justifyContent="space-between">
          <Text fontSize="md" textAlign="left" fontWeight="medium">
            1. Give the UP Browser Extension the necessary permissions to engage
            the protocol
          </Text>
          <Button
            size="sm"
            bg="orange.500"
            color="white"
            _hover={{ bg: 'orange.600' }}
            _active={{ bg: 'orange.700' }}
          >
            Give Permissions
          </Button>
        </HStack>

        {/* Instruction 2 */}
        <HStack justifyContent="space-between">
          <Text fontSize="md" textAlign="left" fontWeight="medium">
            2. Install the Universal Assistant Protocol on your{' '}
            <span role="img" aria-label="device">
              💻
            </span>
          </Text>
          <Button
            size="sm"
            bg="orange.500"
            color="white"
            _hover={{ bg: 'orange.600' }}
            _active={{ bg: 'orange.700' }}
          >
            Give Permissions
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default URDSetup;
