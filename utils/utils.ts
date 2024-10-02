import { supportedNetworks } from '@/constants/supportedNetworks';

export const creationSteps = [
  { title: 'Publish list details', complete: false },
  {
    title: 'Publish list entries',
    complete: false,
  },
];

export const UpdateSteps = [
  { title: 'Update list details', complete: false },
  {
    title: 'Update entries',
    complete: false,
  },
];

export const validNetworkIds = Object.keys(supportedNetworks).map(networkId =>
  parseInt(networkId)
);

export const getNetwork = (chainId: number) => {
  const network = supportedNetworks[chainId];
  if (!network) {
    throw new Error('Network not supported');
  }
  return network;
};

export const formatAddress = (address: string | null) => {
  if (!address) return '0x';
  if (address.length < 10) return address; // '0x' is an address
  return `${address.slice(0, 5)}...${address.slice(-4)}`;
};

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + '...';
};
