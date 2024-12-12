import React from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
} from '@chakra-ui/react';

// Assistant Info Component
function AssistantInfo() {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      flexDirection="row"
      alignItems="center"
      maxWidth="400px"
    >
      <Image
        boxSize="50px"
        borderRadius="full"
        src="https://via.placeholder.com/50"
        alt="Assistant Logo"
      />
      <Box ml={4}>
        <Flex alignItems="center" flexWrap="nowrap">
          <Text fontSize="lg" fontWeight="bold" mb={1}>
            Asset Forwarder
          </Text>
          <Badge colorScheme="orange" fontSize="0.8em" borderRadius="md">
            Executive Assistant
          </Badge>
        </Flex>
        <Text fontSize="sm" color="gray.600">
          An executive assistant that can forward digital assets to another
          destination address.
        </Text>
        <Text fontSize="sm" color="gray.600" mb={2}>
          By:{' '}
          <span style={{ fontWeight: 'bold', color: '#E53E3E' }}>Year One</span>
        </Text>
      </Box>
    </Flex>
  );
}

// Supported Transactions Component
function SupportedTransactions() {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <Text fontWeight="bold">Supported Transactions</Text>
      <HStack spacing={4}>
        <VStack>
          <Image
            src="https://via.placeholder.com/24"
            alt="Icon"
            boxSize="24px"
          />
          <Text fontSize="sm">LSP7s</Text>
        </VStack>
        <VStack>
          <Image
            src="https://via.placeholder.com/24"
            alt="Icon"
            boxSize="24px"
          />
          <Text fontSize="sm">LSP8s</Text>
        </VStack>
        <VStack>
          <Image
            src="https://via.placeholder.com/24"
            alt="Icon"
            boxSize="24px"
          />
          <Text fontSize="sm">LYX</Text>
        </VStack>
      </HStack>
    </Flex>
  );
}

// Screening Option Card Component
function ScreeningOptionCard() {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      flexDirection="row"
      alignItems="center"
      maxWidth="400px"
    >
      <Image
        boxSize="50px"
        borderRadius="full"
        src="https://via.placeholder.com/50"
        alt="Screener Logo"
      />
      <Box ml={4}>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          Curation Checker
        </Text>
        <Text fontSize="sm" color="gray.600" mb={2}>
          By:{' '}
          <span style={{ fontWeight: 'bold', color: '#E53E3E' }}>Year One</span>
        </Text>
        <Badge
          colorScheme="blue"
          fontSize="0.8em"
          borderRadius="md"
          px={2}
          py={1}
          mb={2}
        >
          Screener Assistant
        </Badge>
        <Text fontSize="sm" color="gray.600">
          Checks if a specified address is a member of a curated list.
        </Text>
      </Box>
    </Flex>
  );
}

// Screening Options Component
function ScreeningOptions() {
  return (
    <Flex flexDirection="row" alignItems="flex-start" gap={4} mt={4}>
      <Text fontWeight="bold" fontSize="md" color="gray.600">
        Screening Options
      </Text>
      <ScreeningOptionCard />
    </Flex>
  );
}

export default function ExecutiveAssistantPage({
  params,
}: {
  params: { networkName: string; assistantId: string };
}) {
  const { networkName } = params;

  const breadCrumbs = (
    <Breadcrumb separator="/" color="hashlists.orange" fontWeight="600">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">#</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/${networkName}/catalog`}>
          Catalog
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href={`/${networkName}/catalog/executive-assistants`}>
          Executive Assistants
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="">Assistant {params.assistantId}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );

  return (
    <Box p={4}>
      {breadCrumbs}
      <Flex direction="column" gap={4} mt={4}>
        <Flex>
          <AssistantInfo />
          <SupportedTransactions />
        </Flex>
        <ScreeningOptions />
      </Flex>
    </Box>
  );
}
