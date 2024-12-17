'use client';
import React, { useEffect } from 'react';
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
import AssistantInfo from '@/components/AssistantInfo';
import { forwarderAssistant } from '@/constants/dummyData';
import URDSetup from '@/components/URDSetup';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import SignInBox from '@/components/SignInBox';
import { getNetwork } from '@/utils/utils';
import { getChainIdByUrlName } from '@/utils/universalProfile';
import { useNetwork } from '@/contexts/NetworkContext';
import { doesControllerHaveMissingPermissions } from '@/utils/configDataKeyValueStore';
import TransactionSelector from '@/components/SetupAssistant';
import { useProfile } from '@/contexts/ProfileContext';

export default function ExecutiveAssistantConfigurePage({
  params,
}: {
  params: { networkName: string; assistantAddress: string };
}) {
  const { networkName } = params;
  const networkUrlId = getChainIdByUrlName(params.networkName);
  const { open } = useWeb3Modal();
  const { mainUPController } = useProfile();
  const [isMissingPermissions, setIsMissingPermissions] = React.useState(false);

  const { address, chainId: walletNetworkId } = useWeb3ModalAccount();
  // todo validate that id from url is a valid assistant id

  useEffect(() => {
    console.log('ssss mainUPController', mainUPController);

    if (!address || !mainUPController) {
      return;
    }
    // todo:
    // check if there are missing permissions for urd even if installed, on page load
    const getMissingPermissions = async () => {
      try {
        const missingPermissions = await doesControllerHaveMissingPermissions(
          mainUPController, // TODO: where to get this from?
          address
        );
        console.log('mainUPController', mainUPController);
        console.log('missingPermissions', missingPermissions);
        setIsMissingPermissions(missingPermissions.length > 0);
      } catch (error) {
        console.error('Error checking permissions', error);
      }
    };

    getMissingPermissions();
    // check if URD is installed on page load
  }, [address, mainUPController, setIsMissingPermissions]);

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
            href={`/${networkName}/catalog/executive-assistants/${params.assistantAddress}`}
            ml={2}
            mr={2}
          >
            Assistant {params.assistantAddress}
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

  const renderConfigureBody = () => {
    if (!walletNetworkId || !address) {
      return <SignInBox boxText={'Sign in to set UAPTypeConfig'} />;
    }

    if (walletNetworkId !== networkUrlId) {
      return (
        <Flex
          height="100%"
          w="100%"
          alignContent="center"
          justifyContent="center"
          pt={4}
        >
          <VStack>
            <Text>You're connect to {getNetwork(walletNetworkId).name}.</Text>
            <Text>Please change network</Text>
            <Button onClick={() => open({ view: 'Networks' })}>
              Change network
            </Button>
          </VStack>
        </Flex>
      );
    }

    if (!mainUPController || isMissingPermissions) {
      return <URDSetup />;
    }

    return (
      <TransactionSelector
        assistantAddress={params.assistantAddress as string}
      />
    );
  };

  return (
    <Box p={4} w="100%">
      {breadCrumbs}
      <Flex direction="column" gap={4} mt={4} w="100%">
        <Flex w="100%">
          <AssistantInfo assistant={forwarderAssistant} />
        </Flex>
        <Box border="1px" borderColor="gray.200" w="100%" />
        {renderConfigureBody()}
        <Box border="1px" borderColor="gray.200" w="100%" />
      </Flex>
    </Box>
  );
}
