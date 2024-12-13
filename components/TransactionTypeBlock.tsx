import { Flex, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const transactionTypeMap: {
  [key: string]: {
    label: string;
    typeName: string;
    icon?: string;
    iconPath?: string;
  };
} = {
  LSP7Tokens: { label: 'Receiving', typeName: 'LSP7s', icon: '🪙' },
  LSP8Tokens: { label: 'Receiving', typeName: 'LSP8s', icon: '🖼️' },
  LYX: {
    label: 'Receiving',
    typeName: 'LYX',
    iconPath: '/lyx_icon_mainnet.svg',
  },
};

const TransactionTypeBlock: React.FC<{
  label: string;
  typeName: string;
  icon?: string;
  iconPath?: string;
}> = ({ label, typeName, icon, iconPath }) => (
  <VStack textAlign="center" spacing={1}>
    <Text fontWeight="bold" fontSize="md">
      {label}
    </Text>
    <Flex>
      <Text fontWeight="bold" fontSize="md" ml="2px">
        {icon && icon}
        {iconPath && <Image src={iconPath} alt={iconPath} height={'20px'} />}
      </Text>
      <Text fontWeight="bold" fontSize="md">
        {typeName}
      </Text>
    </Flex>
  </VStack>
);

export default TransactionTypeBlock;
