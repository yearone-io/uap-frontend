'use client';
import React, { useEffect, useState } from 'react';
import {
  Center,
  Flex,
  Button,
  Grid,
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import WalletNetworkSelectorButton from '@/components/AppNetworSelectorDropdown';

export default function Page({
  params,
}: {
  params: { networkId: string };
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const networkId = parseInt(params.networkId);

  return (
    <>
      <Breadcrumb
        separator="/"
        color={'hashlists.orange'}
        fontFamily={'Tomorrow'}
        fontWeight={600}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">UAP</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Flex
            as={Flex}
            flexDir={'row'}
            w={'100%'}
            gap={2}
            alignItems={'center'}
          >
            <WalletNetworkSelectorButton
              currentNetwork={parseInt(params.networkId)}
              urlTemplate={(networkId: number): string =>
                `/curated-lists/${networkId}`
              }
            />
            <Box>Assistant Configuration</Box>
          </Flex>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box>GM</Box>
    </>
  );
}
