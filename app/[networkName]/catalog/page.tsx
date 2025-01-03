'use client';
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Breadcrumbs from '@/components/Breadcrumbs';
import AssistantInfo from '@/components/AssistantInfo';
import {
  curationCheckerAssistant,
  forwarderAssistant,
} from '@/constants/dummyData';

export default function CatalogPage({
  params,
}: {
  params: { networkName: string };
}) {
  const breadCrumbs = Breadcrumbs({
    items: [
      { name: 'UPAC', href: '/' },
      { name: 'Catalog', href: `/${params.networkName}/catalog` },
    ],
  });
  return (
    <>
      {breadCrumbs}
      <Flex
        display="flex"
        w={'100%'}
        flexDirection={'column'}
        flexWrap={'wrap'}
      >
        <Flex gap="20" flex="1" w={'100%'} maxWidth="800px">
          <Box>
            <Box
              color={'uap.font'}
              fontFamily={'Montserrat'}
              fontSize={'2xl'}
              fontWeight={700}
            >
              Executive Assistants
            </Box>
            <Box
              border={'1px solid'}
              borderColor={'uap.font'}
              borderRadius={10}
              p={4}
            >
              <AssistantInfo assistant={forwarderAssistant} />
            </Box>
          </Box>
          <Box>
            <Box
              color={'uap.font'}
              fontFamily={'Montserrat'}
              fontSize={'2xl'}
              fontWeight={700}
            >
              Screener Assistants
            </Box>
            <Box
              border={'1px solid'}
              borderColor={'uap.font'}
              borderRadius={10}
              p={4}
            >
              <AssistantInfo assistant={curationCheckerAssistant} />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
