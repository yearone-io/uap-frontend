interface ChainInfo {
  name: string;
  chainId: string;
  rpcUrl: string;
  ipfsGateway: string;
  explorer: string;
  token: string;
  protocolAddress: string;
  hasUPSupport: boolean;
  icon: string;
}

export const supportedNetworks: { [key: string]: ChainInfo } = {
  '42': {
    name: 'LUKSO',
    chainId: '42',
    rpcUrl: 'https://42.rpc.thirdweb.com',
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
    explorer: 'https://explorer.execution.mainnet.lukso.network/',
    token: 'LYX',
    protocolAddress: '0xcD24F4b22729f3d531853255e1F31D87E42dD219',
    hasUPSupport: true,
    icon: '/lyx_icon_mainnet.svg',
  },
  '4201': {
    name: 'LUKSO Testnet',
    chainId: '4201',
    rpcUrl: 'https://4201.rpc.thirdweb.com',
    ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
    explorer: 'https://explorer.execution.testnet.lukso.network/',
    token: 'LYXt',
    protocolAddress: '0xd5127cBcb66cCb18ff02d85FB461E4c284319023',
    hasUPSupport: true,
    icon: '/lyx_icon_testnet.svg',
  },
};
