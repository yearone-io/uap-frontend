import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
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
import { AbiCoder, BrowserProvider, Eip1193Provider } from 'ethers';
import {
  generateMappingKey,
  toggleUniveralAssistantsSubscribe,
} from '@/utils/configDataKeyValueStore';
import { ERC725__factory } from '@/types';
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers/react';
import { useNetwork } from '@/contexts/NetworkContext';

type ConfigParam = { name: string; type: string };

type SetupAssistantProps = {
  assistantAddress: string;
  configParams: ConfigParam[];
};

const SetupAssistant: React.FC<SetupAssistantProps> = ({
  assistantAddress,
  configParams,
}) => {
  // Instead of separate states for each field, we store them in an object.
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    configParams.forEach(param => {
      initial[param.name] = '';
    });
    return initial;
  });
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>(
    []
  );
  const [isUpSubscribedToAssistant, setIsUpSubscribedToAssistant] =
    useState<boolean>(false);
  const [isLoadingTrans, setIsLoadingTrans] = useState<boolean>(true);

  const toast = useToast({ position: 'bottom-left' });
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();
  const { network } = useNetwork();

  // Ethers helper to get a signer
  const getSigner = async () => {
    if (!walletProvider || !address)
      throw new Error('No wallet/address found!');
    const provider = new BrowserProvider(walletProvider as Eip1193Provider);
    return provider.getSigner(address);
  };

  // --------------------------------------------------------------------------
  // On Page Load, Fetch Existing Config
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (!address) return;

    const loadExistingConfig = async () => {
      try {
        const signer = await getSigner();
        const upContract = ERC725__factory.connect(address, signer);

        // Build an array of transaction type IDs
        const allTypeIds = Object.values(transactionTypeMap).map(obj => obj.id);
        // Build the data keys for each ID
        const allTypeConfigKeys = allTypeIds.map(id =>
          generateMappingKey('UAPTypeConfig', id)
        );

        // Build the assistant config key
        const assistantConfigKey = generateMappingKey(
          'UAPExecutiveConfig',
          assistantAddress
        );

        // Fetch all keys in one call
        const allData = await upContract.getDataBatch([
          ...allTypeConfigKeys,
          assistantConfigKey,
        ]);
        // The first N entries are the transaction type config values;
        // the last is the assistant config.
        const typeConfigValues = allData.slice(0, allTypeIds.length);
        const assistantConfigValue = allData[allTypeIds.length];

        const abiCoder = new AbiCoder();
        const newlySelectedTx: string[] = [];

        // Decode each transaction type (stored as a single address)
        typeConfigValues.forEach((encodedValue, index) => {
          if (!encodedValue || encodedValue === '0x') {
            return; // no address stored
          }
          const storedAddress = abiCoder.decode(
            ['address'],
            encodedValue
          )[0] as string;
          if (storedAddress.toLowerCase() === assistantAddress.toLowerCase()) {
            newlySelectedTx.push(allTypeIds[index]);
          }
        });

        // If an assistant config exists, decode it using the types from configParams.
        if (assistantConfigValue && assistantConfigValue !== '0x') {
          const types = configParams.map(param => param.type);
          const decoded = abiCoder.decode(types, assistantConfigValue);
          const newFieldValues: Record<string, string> = {};
          configParams.forEach((param, index) => {
            // Use toString() to convert decoded BigNumbers (or similar) to strings
            newFieldValues[param.name] = decoded[index].toString();
          });
          setFieldValues(newFieldValues);
          setIsUpSubscribedToAssistant(true);
        } else {
          setIsUpSubscribedToAssistant(false);
        }

        setSelectedTransactions(newlySelectedTx);
        setIsLoadingTrans(false);
      } catch (err) {
        setIsLoadingTrans(false);
        console.error('Failed to load existing config:', err);
      }
    };

    loadExistingConfig();
  }, [address, assistantAddress, configParams]);

  // --------------------------------------------------------------------------
  // Save config
  // --------------------------------------------------------------------------
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

    // Validate each field based on its Solidity type.
    for (const param of configParams) {
      const value = fieldValues[param.name];
      if (!value) {
        toast({
          title: 'Incomplete data',
          description: `Please fill in ${param.name}.`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if (param.type === 'bytes32' && !/^0x[0-9A-Fa-f]{64}$/.test(value)) {
        toast({
          title: `Invalid ${param.name}`,
          description: 'Must be 32-byte hex (0x + 64 hex characters).',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      if (param.type.startsWith('uint') && isNaN(Number(value))) {
        toast({
          title: `Invalid ${param.name}`,
          description: 'Please enter a valid number.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }

    try {
      setIsLoadingTrans(true);
      const signer = await getSigner();
      const upContract = ERC725__factory.connect(address, signer);

      const dataKeys: string[] = [];
      const dataValues: string[] = [];

      const abiCoder = new AbiCoder();

      // For each selected transaction type, store the assistant’s address.
      selectedTransactions.forEach(txTypeId => {
        const typeConfigKey = generateMappingKey('UAPTypeConfig', txTypeId);
        dataKeys.push(typeConfigKey);
        const encodedAddress = abiCoder.encode(['address'], [assistantAddress]);
        dataValues.push(encodedAddress);
      });

      // Build the assistant settings using the generic config.
      const assistantSettingsKey = generateMappingKey(
        'UAPExecutiveConfig',
        assistantAddress
      );
      const types = configParams.map(param => param.type);
      const values = configParams.map(param => {
        // Example: if you want one of the fields (say "collectionAddr") to use a default value,
        // you can override here. Otherwise, use the value from state.
        if (param.name === 'collectionAddr') {
          return network.burntPixCollectionAddress;
        }
        // For uint types, you might want to convert to a number or BigNumber if necessary.
        return fieldValues[param.name];
      });
      const settingsValue = abiCoder.encode(types, values);
      dataKeys.push(assistantSettingsKey);
      dataValues.push(settingsValue);

      // Write everything in one transaction
      const tx = await upContract.setDataBatch(dataKeys, dataValues);
      await tx.wait();

      toast({
        title: 'Success',
        description: 'Assistant settings saved successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setIsLoadingTrans(false);
      setIsUpSubscribedToAssistant(true);
    } catch (err: any) {
      setIsLoadingTrans(false);
      console.error('Error setting configuration', err);
      toast({
        title: 'Error',
        description: `Error setting configuration: ${err.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // --------------------------------------------------------------------------
  // Unsubscribe only this Assistant
  // --------------------------------------------------------------------------
  const handleUnsubscribeAssistant = async () => {
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
      setIsLoadingTrans(true);
      const signer = await getSigner();
      const upContract = ERC725__factory.connect(address, signer);

      const dataKeys: string[] = [];
      const dataValues: string[] = [];

      // For each currently subscribed transaction type, clear the key.
      selectedTransactions.forEach(txTypeId => {
        const typeConfigKey = generateMappingKey('UAPTypeConfig', txTypeId);
        dataKeys.push(typeConfigKey);
        dataValues.push('0x');
      });

      // Also clear the assistant config.
      const assistantSettingsKey = generateMappingKey(
        'UAPExecutiveConfig',
        assistantAddress
      );
      dataKeys.push(assistantSettingsKey);
      dataValues.push('0x');

      const tx = await upContract.setDataBatch(dataKeys, dataValues);
      await tx.wait();

      toast({
        title: 'Success',
        description: 'Unsubscribed from Assistant!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Clear local UI state.
      setSelectedTransactions([]);
      // Reset the field values.
      const cleared: Record<string, string> = {};
      configParams.forEach(param => (cleared[param.name] = ''));
      setFieldValues(cleared);
      setIsUpSubscribedToAssistant(false);
      setIsLoadingTrans(false);
    } catch (err: any) {
      setIsLoadingTrans(false);
      console.error('Error unsubscribing assistant', err);
      toast({
        title: 'Error',
        description: `Error unsubscribing assistant: ${err.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // --------------------------------------------------------------------------
  // Unsubscribe the entire UAP
  // --------------------------------------------------------------------------
  const handleUnsubscribeURD = async () => {
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
      setIsLoadingTrans(true);
      const provider = new BrowserProvider(walletProvider as Eip1193Provider);
      await toggleUniveralAssistantsSubscribe(
        provider,
        address,
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

      // Clear local states.
      setSelectedTransactions([]);
      const cleared: Record<string, string> = {};
      configParams.forEach(param => (cleared[param.name] = ''));
      setFieldValues(cleared);
      setIsLoadingTrans(false);
      // Refresh page.
      window.location.reload();
    } catch (err: any) {
      setIsLoadingTrans(false);
      console.error('Error uninstalling UAP:', err);
      toast({
        title: 'Error',
        description: `Error uninstalling UAP: ${err.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // --------------------------------------------------------------------------
  // Render
  // --------------------------------------------------------------------------
  return (
    <Box p={4}>
      <Grid templateColumns="1fr 2fr" gap={2} alignItems="start">
        {/* Transaction Types */}
        <GridItem>
          <Text fontWeight="bold" fontSize="md">
            Select a transaction type that you will engage this assistant for:
          </Text>
        </GridItem>
        <GridItem>
          <CheckboxGroup
            colorScheme="orange"
            value={selectedTransactions}
            onChange={(values: string[]) => setSelectedTransactions(values)}
          >
            <VStack
              align="stretch"
              border="1px solid #E2E8F0"
              borderRadius="10px"
              p={6}
              width="fit-content"
            >
              {Object.entries(transactionTypeMap).map(
                ([key, { id, label, typeName, icon, iconPath }]) => (
                  <Checkbox key={key} value={id}>
                    <TransactionTypeBlock
                      label={label}
                      typeName={typeName}
                      icon={icon}
                      iconPath={iconPath}
                    />
                  </Checkbox>
                )
              )}
            </VStack>
          </CheckboxGroup>
        </GridItem>

        {/* Assistant Settings */}
        <GridItem colSpan={2} mt={6}>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            1. Configure Assistant Settings
          </Text>
        </GridItem>

        {configParams.map(param => (
          <React.Fragment key={param.name}>
            <GridItem>
              <Text>
                {param.name} ({param.type}):
              </Text>
            </GridItem>
            <GridItem>
              <Input
                placeholder={param.name}
                value={
                  // If this is a field that should be pre-populated (e.g. collectionAddr)
                  // you can override here. Otherwise, use the state.
                  fieldValues[param.name] ||
                  (param.name === 'collectionAddr'
                    ? network.burntPixCollectionAddress
                    : '')
                }
                onChange={e =>
                  setFieldValues({
                    ...fieldValues,
                    [param.name]: e.target.value,
                  })
                }
                // Example: you might set a smaller width for number fields.
                w={param.type.startsWith('uint') ? 20 : 80}
                // Optionally disable fields that should not be edited.
                isDisabled={param.name === 'collectionAddr'}
              />
            </GridItem>
          </React.Fragment>
        ))}

        {/* Action Buttons */}
        <GridItem mt={4}>
          {isUpSubscribedToAssistant && (
            <Button
              size="sm"
              bg="orange.500"
              color="white"
              mr="2"
              _hover={{ bg: 'orange.600' }}
              _active={{ bg: 'orange.700' }}
              onClick={handleUnsubscribeAssistant}
              isLoading={isLoadingTrans}
              isDisabled={isLoadingTrans}
            >
              Unsubscribe Assistant
            </Button>
          )}
          <Button
            size="sm"
            bg="orange.500"
            color="white"
            _hover={{ bg: 'orange.600' }}
            _active={{ bg: 'orange.700' }}
            onClick={handleUnsubscribeURD}
            isLoading={isLoadingTrans}
            isDisabled={isLoadingTrans}
          >
            Unsubscribe URD
          </Button>
        </GridItem>
        <GridItem mt={4}>
          <Button
            size="sm"
            bg="orange.500"
            color="white"
            _hover={{ bg: 'orange.600' }}
            _active={{ bg: 'orange.700' }}
            onClick={handleSubmitConfig}
            isLoading={isLoadingTrans}
            isDisabled={isLoadingTrans}
          >
            Save
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SetupAssistant;
