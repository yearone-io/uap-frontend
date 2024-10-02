'use client';
import React, { useEffect, useState } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';
import { supportedNetworks } from '@/constants/supportedNetworks';
import { Image, Button } from '@chakra-ui/react';

const NetworkSelectorButton = () => {
  const { open } = useWeb3Modal();
  const { chainId } = useWeb3ModalAccount();
  const [supportedNetwork, setSupportNetwork] = useState(false);
  const [networkIcon, setNetworkIcon] = useState<string>();
  const [networkName, setNetworkName] = useState<string>();

  useEffect(() => {
    if (chainId && supportedNetworks[chainId]) {
      setSupportNetwork(true);
      const currentNetwork = supportedNetworks[chainId!];
      currentNetwork.icon
        ? setNetworkIcon(currentNetwork.icon)
        : setNetworkIcon('');
      currentNetwork.name
        ? setNetworkName(currentNetwork.name)
        : setNetworkName('');
    } else {
      setSupportNetwork(false);
      setNetworkIcon('');
      setNetworkName('');
    }
  }, [chainId]);

  return chainId && supportedNetwork ? (
    <Button
      style={{
        fontFamily: 'Montserrat',
        fontWeight: 600,
        background: 'transparent',
      }}
      onClick={() => open({ view: 'Networks' })}
      width={'min-content'}
      paddingX={'0'}
    >
      <Image height={'30px'} src={networkIcon} alt={networkName} />
    </Button>
  ) : null;
};

export default NetworkSelectorButton;
