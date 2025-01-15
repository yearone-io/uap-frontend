import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  GridItem,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import TransactionTypeBlock, {
  transactionTypeMap,
} from './TransactionTypeBlock';
import { AbiCoder, BrowserProvider, Eip1193Provider, ethers } from 'ethers';
import {
  customEncodeAddresses,
  generateMappingKey,
  toggleUniveralAssistantsSubscribe,
} from '@/utils/configDataKeyValueStore';
import { ERC725__factory } from '@/types';
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers/react';
import { useNetwork } from '@/contexts/NetworkContext';
import { LSP1_TYPE_IDS } from '@lukso/lsp-smart-contracts';

type SetupAssistantProps = {
  assistantAddress: string;
};

const SetupAssistant: React.FC<SetupAssistantProps> = props => {
  const [burntPixId, setBurntPixId] = useState<string>('');
  const [collectionAddress, setCollectionAddress] = useState<string>('');
  const [iters, setIters] = useState<string>('');

  const toast = useToast({ position: 'bottom-left' });
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();
  const { network } = useNetwork();

  // Helper to get ethers.js provider + signer
  const getSigner = async () => {
    const provider = new BrowserProvider(walletProvider as Eip1193Provider);
    return provider.getSigner(address!);
  };

  const handleSubmitConfig = async () => {
    if (!address) {
      toast({
        title: 'Not connected',
        description: 'Please connect your wallet first.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const signer = await getSigner();
      const upAddress = address; // The UP's address is the same as the connected address in your scenario
      const UP = ERC725__factory.connect(upAddress, signer);

      const dataKeys: string[] = [];
      const dataValues: string[] = [];
      const typeConfigKey = generateMappingKey(
        'UAPTypeConfig',
        LSP1_TYPE_IDS.LSP0ValueReceived
      );
      dataKeys.push(typeConfigKey);
      dataValues.push(customEncodeAddresses([props.assistantAddress]));

      if (!burntPixId || !collectionAddress || !iters) {
        toast({
          title: 'Incomplete data',
          description:
            'Please fill in burntPixId, collection address, and number of iterations.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // Make sure each field is well-formed
      if (!/^0x[0-9a-fA-F]{64}$/.test(burntPixId)) {
        toast({
          title: 'Invalid burntPixId',
          description: 'burntPixId must be a 32-byte hex string (0x + 64 hex).',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if (!/^0x[0-9a-fA-F]{40}$/.test(collectionAddress)) {
        toast({
          title: 'Invalid collection address',
          description: 'Collection must be a valid Ethereum address.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      // todo: add validation for iters to be smaller than 1000 so incoming tx doesn't run out of gas
      if (isNaN(Number(iters))) {
        toast({
          title: 'Invalid iterations value',
          description: 'Please enter a valid number for iterations.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const assistantSettingsKey = generateMappingKey(
        'UAPExecutiveConfig',
        props.assistantAddress
      );
      const abiCoder = new AbiCoder();
      const settingsValue = abiCoder.encode(
        ['address', 'bytes32', 'uint256'],
        [collectionAddress, burntPixId, Number(iters)]
      );

      // Push these to the batch
      dataKeys.push(assistantSettingsKey);
      dataValues.push(settingsValue);

      // 3) setDataBatch
      const tx = await UP.setDataBatch(dataKeys, dataValues);
      await tx.wait();
      toast({
        title: 'Success',
        description: 'Burnt Pix Refiner Assistant settings saved successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('Error setting configuration', error);
      toast({
        title: 'Error',
        description: `Error setting configuration: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUnsubscribe = async () => {
    try {
      if (!address) {
        toast({
          title: 'Not connected',
          description: 'Please connect your wallet first.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const upAddress = address;
      const provider = new BrowserProvider(walletProvider as Eip1193Provider);

      await toggleUniveralAssistantsSubscribe(
        provider,
        upAddress,
        network.protocolAddress,
        network.defaultURDUP,
        true // uninstall
      );
      toast({
        title: 'Success',
        description: 'Universal Assistant Protocol uninstalled.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('Error uninstalling UAP', error);
      toast({
        title: 'Error',
        description: `Error uninstalling UAP: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <Grid templateColumns="1fr 2fr" gap={2} alignItems="start">
        <GridItem colSpan={2}>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            1. Configure Which Transaction Types Will Call This Assistant
          </Text>
        </GridItem>

        {/* Transaction Types */}
        <GridItem>
          <Text>Transaction type</Text>
        </GridItem>
        <GridItem>
          <VStack spacing={2} align="stretch">
            <TransactionTypeBlock
              label={transactionTypeMap.LYX.label}
              typeName={transactionTypeMap.LYX.typeName}
              icon={transactionTypeMap.LYX.icon}
              iconPath={transactionTypeMap.LYX.iconPath}
            />
            )
          </VStack>
        </GridItem>

        <GridItem colSpan={2} mt={6}>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            1. Configure Burnt Pix Refiner Assistant Settings
          </Text>
        </GridItem>

        {/* Burnt Pix ID */}
        <GridItem>
          <Text>The id of the burnt pix you want to refine:</Text>
        </GridItem>
        <GridItem>
          <Input
            placeholder="0x1234... (64 chars)"
            value={burntPixId}
            onChange={e => setBurntPixId(e.target.value)}
          />
        </GridItem>

        {/* Collection */}
        <GridItem>
          <Text>Burnt Pix Collection Address:</Text>
        </GridItem>
        <GridItem>
          <Input
            placeholder="0xabc123..."
            value={collectionAddress}
            onChange={e => setCollectionAddress(e.target.value)}
          />
        </GridItem>

        {/* Iterations */}
        <GridItem>
          <Text>Iterations:</Text>
        </GridItem>
        <GridItem>
          <Input
            placeholder="e.g. 100"
            value={iters}
            onChange={e => setIters(e.target.value)}
          />
        </GridItem>

        {/* Buttons */}
        <GridItem>
          <Button
            size="sm"
            bg="orange.500"
            color="white"
            _hover={{ bg: 'orange.600' }}
            _active={{ bg: 'orange.700' }}
            onClick={handleSubmitConfig}
          >
            Save
          </Button>
        </GridItem>
        <GridItem>
          <Button
            size="sm"
            bg="orange.500"
            color="white"
            _hover={{ bg: 'orange.600' }}
            _active={{ bg: 'orange.700' }}
            onClick={handleUnsubscribe}
          >
            Unsubscribe URD
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SetupAssistant;
