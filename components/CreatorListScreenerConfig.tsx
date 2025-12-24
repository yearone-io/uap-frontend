'use client';
import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import AddressListManager from './AddressListManager';
import RequireAllCreatorsToggle from './RequireAllCreatorsToggle';

interface CreatorListScreenerConfigProps {
  addresses: string[];
  onAddressesChange: (addresses: string[]) => void;
  requireAllCreators: boolean;
  onRequireAllCreatorsChange: (value: boolean) => void;
  behavior: 'pass' | 'block';
  onBehaviorChange: (behavior: 'pass' | 'block') => void;
}

const CreatorListScreenerConfig: React.FC<CreatorListScreenerConfigProps> = ({
  addresses,
  onAddressesChange,
  requireAllCreators,
  onRequireAllCreatorsChange,
  behavior,
  onBehaviorChange,
}) => {
  return (
    <VStack spacing={4} align="stretch">
      <RequireAllCreatorsToggle
        requireAllCreators={requireAllCreators}
        onRequireAllCreatorsChange={onRequireAllCreatorsChange}
      />

      <AddressListManager
        listName="Creator Address List"
        addresses={addresses}
        onAddressesChange={onAddressesChange}
        behavior={behavior}
        onBehaviorChange={onBehaviorChange}
        placeholder="Add creator address to screening list (0x...)"
      />

      <Box p={4} bg="purple.50" border="1px solid" borderColor="purple.200" borderRadius="lg">
        <Text fontSize="xs" color="purple.800" fontWeight="semibold" mb={2}>
          How Creator List Screening Works:
        </Text>
        <VStack align="start" spacing={1}>
          <Text fontSize="xs" color="purple.700">
            - Screens assets based on their LSP4/LSP12 creator addresses
          </Text>
          <Text fontSize="xs" color="purple.700">
            - {requireAllCreators
              ? 'All creators of the asset must be in your list (strict mode)'
              : 'Any single creator matching your list triggers the screening result'}
          </Text>
          <Text fontSize="xs" color="purple.700">
            - Perfect for filtering assets by trusted creators or studios
          </Text>
        </VStack>
      </Box>
    </VStack>
  );
};

export default CreatorListScreenerConfig;
