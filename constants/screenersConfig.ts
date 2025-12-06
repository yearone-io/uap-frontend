import { ScreenerAssistant } from './CustomTypes';
import { ethers } from 'ethers';

// Testnet Screener Assistants
export const notifierListScreenerTestnet: ScreenerAssistant = {
  address: '0xb5b746a75a464c83f7c1cc838ee3387486883026',
  name: 'Address List Screener',
  description: 'Screen transactions based on source',
  iconPath: '/screeners/default-list.svg',
  assistantType: 'Screener',
  creatorAddress: '0xfE67D89DeBEC38592aB2FeD217b8bbb28851DF88',
  configParams: [
    {
      name: 'returnValueWhenInList',
      type: 'bool',
      description: 'Screening behavior for listed addresses:',
      defaultValue: 'true',
      options: [
        { value: true, label: 'If source address is in list, screening passes' },
        { value: false, label: 'If source address is in list, screening fails' }
      ]
    }
  ],
  chainId: 4201,
  links: [{ name: 'X', url: 'https://x.com/yearone_io' }],
};

export const notifierCurationScreenerTestnet: ScreenerAssistant = {
  address: '0x442cd0098e23a541e3604296e0252de28c1c4fc6',
  name: 'Curated List',
  description: 'Screen based on curation status on third party curated list',
  iconPath: '/screeners/default-curation.svg',
  assistantType: 'Screener',
  creatorAddress: '0xfE67D89DeBEC38592aB2FeD217b8bbb28851DF88',
  configParams: [
    {
      name: 'curatedListAddress',
      type: 'address',
      description: 'Curated list contract address:',
      placeholder: 'Enter contract address (0x...)',
      required: true,
      validate: (value: any) => {
        return ethers.isAddress(value);
      },
      validationMessage: 'Please enter a valid curated list contract address'
    },
    {
      name: 'returnValueWhenCurated',
      type: 'bool',
      description: 'Screening behavior for community members:',
      defaultValue: 'true',
      options: [
        { value: true, label: 'Membership in list triggers pass in screening' },
        { value: false, label: 'Membership in list triggers failure in screening' }
      ]
    }
  ],
  chainId: 4201,
  links: [{ name: 'X', url: 'https://x.com/yearone_io' }],
};

// Mainnet Screener Assistants
export const notifierListScreenerMainnet: ScreenerAssistant = {
  address: '0x25b51e55f493565be327b1a17e958839121435a7',
  name: 'Address List Screener',
  description: 'Screen transactions based on notifier address - only qualified addresses pass screening',
  iconPath: '/screeners/default-list.svg',
  assistantType: 'Screener',
  creatorAddress: '0xec1c59E78De6f840A66b6EE8E4066700Be863529',
  configParams: [
    {
      name: 'returnValueWhenInList',
      type: 'bool',
      description: 'Screening behavior for listed addresses:',
      defaultValue: 'true',
      options: [
        { value: true, label: 'If source address is in list, screening passes' },
        { value: false, label: 'If source address is in list, screening fails' }
      ]
    }
  ],
  chainId: 42,
  links: [{ name: 'X', url: 'https://x.com/yearone_io' }],
};

export const notifierCurationScreenerMainnet: ScreenerAssistant = {
  address: '0x476fef9277f55f306f75cd89300ad9c7e5e36bcb',
  name: 'Curated List',
  description: 'Screen based on curation status on third party curated list',
  iconPath: '/screeners/default-curation.svg',
  assistantType: 'Screener',
  creatorAddress: '0xec1c59E78De6f840A66b6EE8E4066700Be863529',
  configParams: [
    {
      name: 'curatedListAddress',
      type: 'address',
      description: 'Curated list contract address:',
      placeholder: 'Enter contract address (0x...)',
      required: true,
      validate: (value: any) => {
        return ethers.isAddress(value);
      },
      validationMessage: 'Please enter a valid curated list contract address'
    },
    {
      name: 'returnValueWhenCurated',
      type: 'bool',
      description: 'Screening behavior for community members:',
      defaultValue: 'true',
      options: [
        { value: true, label: 'Membership in list triggers pass in screening' },
        { value: false, label: 'Membership in list triggers failure in screening' }
      ]
    }
  ],
  chainId: 42,
  links: [{ name: 'X', url: 'https://x.com/yearone_io' }],
};