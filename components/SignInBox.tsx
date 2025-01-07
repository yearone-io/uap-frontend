import React from 'react';
import { Flex, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import WalletConnectButton from '@/components/WalletConnectButton';

interface SignInBoxProps {
  boxText: string;
}
const SignInBox = ({ boxText }: SignInBoxProps) => {
  const bgColor = useColorModeValue('light.green.brand', 'dark.purple.200'); // Adjusts color based on the theme

  return (<w3m-connect-button
  size={"sm"}
/>
  );
};

export default SignInBox;
