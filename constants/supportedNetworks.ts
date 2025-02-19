import { ExecutiveAssistant } from '@/constants/CustomTypes';
import {
  burntPixRefinerMainnet,
  burntPixRefinerTestnet,
  tipAssistantTestnet,
} from '@/constants/assistantsConfig';

interface ChainInfo {
  name: string;
  displayName: string;
  urlName: string;
  chainId: number;
  url: string;
  rpcUrl: string;
  ipfsGateway: string;
  explorer: string;
  token: string;
  protocolAddress: string;
  defaultURDUP: string;
  hasUPSupport: boolean;
  icon: string;
  universalEverything: string;
  luksoSiteName: string;
  assistants: { [key: string]: ExecutiveAssistant };
}

export enum CHAINS {
  LUKSO = 'lukso',
  LUKSO_TESTNET = 'lukso-testnet',
}

export const supportedNetworks: { [key: string]: ChainInfo } = {
  '42': {
    name: 'LUKSO',
    displayName: 'Lukso Mainnet',
    urlName: 'lukso',
    chainId: 42,
    url: 'https://universalassitant.app',
    rpcUrl: 'https://42.rpc.thirdweb.com',
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
    explorer: 'https://explorer.execution.mainnet.lukso.network/',
    token: 'LYX',
    protocolAddress: '',
    defaultURDUP: '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D',
    hasUPSupport: true,
    icon: '/lyx_icon_mainnet.svg',
    universalEverything: 'https://universaleverything.io',
    luksoSiteName: 'mainnet',
    assistants: {},
  },
  '4201': {
    name: 'LUKSO Testnet',
    displayName: 'Lukso Testnet',
    urlName: 'lukso-testnet',
    chainId: 4201,
    url: 'https://testnet.universalassitant.app',
    rpcUrl: 'https://4201.rpc.thirdweb.com',
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
    explorer: 'https://explorer.execution.testnet.lukso.network/',
    token: 'LYXt',
    protocolAddress: '0x8acAC55bDD2175EDAee675c9A736ba207079CE52',
    defaultURDUP: '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D',
    hasUPSupport: true,
    icon: '/lyx_icon_testnet.svg',
    universalEverything: 'https://universaleverything.io',
    luksoSiteName: 'testnet',
    assistants: {
      [burntPixRefinerTestnet.address.toLowerCase()]: burntPixRefinerTestnet,
      [tipAssistantTestnet.address.toLowerCase()]: tipAssistantTestnet,
    },
  },
};

export const networkNameToIdMapping: { [key: string]: number } = {
  [CHAINS.LUKSO]: 42,
  [CHAINS.LUKSO_TESTNET]: 4201,
};
