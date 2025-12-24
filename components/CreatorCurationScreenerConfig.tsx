'use client';
import React from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import CurationScreenerConfig from './CurationScreenerConfig';
import RequireAllCreatorsToggle from './RequireAllCreatorsToggle';

interface CreatorCurationScreenerConfigProps {
  curatedListAddress: string;
  onCuratedListAddressChange: (address: string) => void;
  requireAllCreators: boolean;
  onRequireAllCreatorsChange: (value: boolean) => void;
  behavior: 'pass' | 'block';
  onBehaviorChange: (behavior: 'pass' | 'block') => void;
  useBlocklist: boolean;
  onUseBlocklistChange: (useBlocklist: boolean) => void;
  blocklistAddresses: string[];
  onBlocklistAddressesChange: (addresses: string[]) => void;
  networkId?: number;
}

const CreatorCurationScreenerConfig: React.FC<CreatorCurationScreenerConfigProps> = ({
  curatedListAddress,
  onCuratedListAddressChange,
  requireAllCreators,
  onRequireAllCreatorsChange,
  behavior,
  onBehaviorChange,
  useBlocklist,
  onUseBlocklistChange,
  blocklistAddresses,
  onBlocklistAddressesChange,
  networkId,
}) => {
  return (
    <VStack spacing={4} align="stretch">
      <RequireAllCreatorsToggle
        requireAllCreators={requireAllCreators}
        onRequireAllCreatorsChange={onRequireAllCreatorsChange}
      />

      <CurationScreenerConfig
        curatedListAddress={curatedListAddress}
        onCuratedListAddressChange={onCuratedListAddressChange}
        behavior={behavior}
        onBehaviorChange={onBehaviorChange}
        useBlocklist={useBlocklist}
        onUseBlocklistChange={onUseBlocklistChange}
        blocklistAddresses={blocklistAddresses}
        onBlocklistAddressesChange={onBlocklistAddressesChange}
        networkId={networkId}
      />

      <Box p={4} bg="purple.50" border="1px solid" borderColor="purple.200" borderRadius="lg">
        <Text fontSize="xs" color="purple.800" fontWeight="semibold" mb={2}>
          Creator Curation Note:
        </Text>
        <Text fontSize="xs" color="purple.700">
          {requireAllCreators
            ? 'All creators of the incoming asset must be members of the curated list for screening to pass.'
            : 'If any creator of the incoming asset is a member of the curated list, screening will pass.'}
        </Text>
      </Box>
    </VStack>
  );
};

export default CreatorCurationScreenerConfig;
