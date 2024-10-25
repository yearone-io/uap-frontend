'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Eip1193Provider } from 'ethers';
import {
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers/react';
import { formatAddress, getNetwork } from '@/utils/utils';
import SignInBox from '@/components/SignInBox';
import ConfiguredAssistants from '@/components/ConfiguredAssistants';
import { useNetwork } from '@/contexts/NetworkContext';
import WalletNetworkSelectorButton from '@/components/AppNetworkSelectorDropdown';

const ProfilePage = () => {
  const { address, chainId: walletNetworkId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { open } = useWeb3Modal();
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);
  const { network } = useNetwork();

  useEffect(() => {
    if (address) {
      setIsUserConnected(true);
    }
  }, [address]);

  const formatAddressForBreadcrumbs = (address: string | undefined) => {
    const truncatedAddress = formatAddress(address ? address : '');
    if (truncatedAddress === '0x') {
      return '';
    } else {
      return truncatedAddress;
    }
  };

  const breadCrumbs = (
    <>
      <Breadcrumb
        separator="/"
        color={'hashlists.orange'}
        fontFamily={'Tomorrow'}
        fontWeight={600}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">#</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <WalletNetworkSelectorButton
            currentNetwork={network.chainId}
            urlTemplate={() => `/urd`}
          />
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="" mr={2}>
            Profile {formatAddressForBreadcrumbs(address)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );

  if (!walletNetworkId || !isUserConnected) {
    return (
      <>
        {breadCrumbs}
        <Flex
          height="100%"
          w="100%"
          alignContent="center"
          justifyContent="center"
          pt={4}
        >
          <SignInBox boxText={'Sign in to set UAPTypeConfig'} />
        </Flex>
      </>
    );
  }

  if (walletNetworkId !== network.chainId) {
    return (
      <>
        {breadCrumbs}
        <Flex
          height="100%"
          w="100%"
          alignContent="center"
          justifyContent="center"
          pt={4}
        >
          <VStack>
            <Text>
              You're on the {network.name} site but your connected wallet is on{' '}
              {getNetwork(walletNetworkId).name}
            </Text>
            <Text>Please change network</Text>
            <Button onClick={() => open({ view: 'Networks' })}>
              Change network
            </Button>
            <Text>Or visit the {getNetwork(walletNetworkId).name} site</Text>
            <WalletNetworkSelectorButton
              currentNetwork={network.chainId}
              urlTemplate={() => '/urd'}
            />
          </VStack>
        </Flex>
      </>
    );
  }

  return (
    <>
      {breadCrumbs}
      <Flex
        display="flex"
        w={'100%'}
        flexDirection={'column'}
        flexWrap={'wrap'}
        gap={4}
        mt={4}
      >
        <Box flex="1" w={'100%'} maxWidth="800px">
          <ConfiguredAssistants
            upAddress={address as string}
            networkId={walletNetworkId as number}
            walletProvider={walletProvider as Eip1193Provider}
          />
        </Box>
      </Flex>
    </>
  );
};

export default ProfilePage;
