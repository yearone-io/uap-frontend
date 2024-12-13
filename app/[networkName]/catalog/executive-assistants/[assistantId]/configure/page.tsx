'use client';
import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
} from '@chakra-ui/react';
import AssistantInfo from '@/components/AssistantInfo';
import { forwarderAssistant } from '@/constants/dummyData';

export default function ExecutiveAssistantConfigurePage({
  params,
}: {
  params: { networkName: string; assistantId: string };
}) {
  const { networkName } = params;

  // todo validate that id from url is a valid assistant id

  const breadCrumbs = (
    <>
      <Breadcrumb
        separator="/"
        color={'uap.orange'}
        fontFamily={'Tomorrow'}
        fontWeight={600}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">#</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`${networkName}/catalog`} ml={2} mr={2}>
            Catalog
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/${networkName}/catalog/executive-assistants`}
            ml={2}
            mr={2}
          >
            Executive Assistants
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            href={`/${networkName}/catalog/executive-assistants/${params.assistantId}`}
            ml={2}
            mr={2}
          >
            Assistant {params.assistantId}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="" ml={2} mr={2}>
            Configure
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );

  return (
    <Box p={4} w="100%">
      {breadCrumbs}
      <Flex direction="column" gap={4} mt={4} w="100%">
        <Flex w="100%">
          <AssistantInfo assistant={forwarderAssistant} />
        </Flex>
        <Box border="1px" borderColor="gray.200" w="100%" />
        <Box border="1px" borderColor="gray.200" w="100%" />
      </Flex>
    </Box>
  );
}
