'use client';
import React from 'react';
import {
  Box,
  Text,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';

interface RequireAllCreatorsToggleProps {
  requireAllCreators: boolean;
  onRequireAllCreatorsChange: (value: boolean) => void;
}

const RequireAllCreatorsToggle: React.FC<RequireAllCreatorsToggleProps> = ({
  requireAllCreators,
  onRequireAllCreatorsChange,
}) => {
  return (
    <Box mb={4}>
      <Text fontSize="sm" fontWeight="semibold" mb={3}>
        Creator Matching Mode:
      </Text>
      <RadioGroup
        value={requireAllCreators ? 'all' : 'any'}
        onChange={(value) => onRequireAllCreatorsChange(value === 'all')}
      >
        <Stack spacing={3}>
          <Radio value="any" colorScheme="green">
            <Text fontSize="sm">Any creator in list passes (OR logic)</Text>
            <Text fontSize="xs" color="gray.500">
              Asset passes if at least one creator is in the list
            </Text>
          </Radio>
          <Radio value="all" colorScheme="purple">
            <Text fontSize="sm">All creators must be in list (AND logic)</Text>
            <Text fontSize="xs" color="gray.500">
              Asset passes only if every creator is in the list
            </Text>
          </Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};

export default RequireAllCreatorsToggle;
