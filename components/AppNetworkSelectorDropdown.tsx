import React from 'react';
import { supportedNetworks } from '@/constants/supportedNetworks';
import { Flex, Select, Image } from '@chakra-ui/react';
import { getNetwork } from '@/utils/utils';

const WalletNetworkSelectorButton = ({
  currentNetwork,
}: {
  currentNetwork: number;
}) => {
  return (
    <Flex gap={2} flexDirection={'row'} alignItems={'center'}>
      <Image
        src={supportedNetworks[currentNetwork].icon}
        alt={supportedNetworks[currentNetwork].icon}
        height={'30px'}
      />
      <Select
        border={'1px solid var(--chakra-colors-hashlists-orange)'}
        variant="outline"
        defaultValue={currentNetwork}
        fontWeight={600}
        onChange={event =>
          (window.location.href = getNetwork(parseInt(event.target.value)).url)
        }
      >
        {Object.keys(supportedNetworks).map((networkId: string) => {
          const network = supportedNetworks[networkId];
          return (
            <option key={networkId} value={parseInt(networkId)}>
              {network.name}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
};

export default WalletNetworkSelectorButton;
