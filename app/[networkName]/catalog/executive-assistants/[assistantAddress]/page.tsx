import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import AssistantInfo from '@/components/AssistantInfo';
import SupportedTransactions from '@/components/SupportedTransactions';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  CHAINS,
  networkNameToIdMapping,
  supportedNetworks,
} from '@/constants/supportedNetworks';

const ExecutiveAssistantPage: React.FC<{
  params: { networkName: CHAINS; assistantAddress: string };
}> = ({ params }) => {
  const { networkName } = params;
  const pageNetwork = supportedNetworks[networkNameToIdMapping[networkName]];
  const assistantInfo =
    pageNetwork.assistants[params.assistantAddress.toLowerCase()];
  if (!assistantInfo) {
    return <Text>Assistant not found</Text>;
  }

  const breadCrumbs = Breadcrumbs({
    items: [
      { name: 'UP Assistants', href: '/' },
      { name: 'Catalog', href: `/${networkName}/catalog` },
      {
        name: 'Executives',
        href: `/${networkName}/catalog`,
      },
      {
        name: `${assistantInfo.name}`,
        href: `/${networkName}/catalog/executive-assistants/${assistantInfo.address}`,
      },
    ],
  });
  // Get assistant data

  return (
    <Box p={4} w="100%">
      {breadCrumbs}
      <Flex direction="column" gap={4} mt={4} w="100%">
        <Flex w="100%">
          <AssistantInfo assistant={assistantInfo} />
          <SupportedTransactions assistant={assistantInfo} />
        </Flex>
        <Box border="1px" borderColor="gray.200" w="100%" />
      </Flex>
    </Box>
  );
};

export default ExecutiveAssistantPage;
