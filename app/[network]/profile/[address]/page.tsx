'use client';
import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Image,
} from '@chakra-ui/react';
import { formatAddress } from '@/utils/utils';
import ReadConfiguredAssistants from '@/components/ReadConfiguredAssistants';
import { supportedNetworks } from '@/constants/supportedNetworks';
import WalletNetworkSelectorButton from '@/components/AppNetworkSelectorDropdown';
export default function ProfilePage({
  params,
}: {
  params: { address: string; network: number };
}) {
  const { address, network } = params;

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
            currentNetwork={network}
            urlTemplate={`/profile/${address}`}
          />
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="" ml={2} mr={2}>
            Profile {formatAddressForBreadcrumbs(address)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );

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
          <ReadConfiguredAssistants
            upAddress={address as string}
            networkId={Number(network)}
          />
        </Box>
      </Flex>
    </>
  );
}
