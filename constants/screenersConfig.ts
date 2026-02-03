import { ScreenerAssistant } from './CustomTypes';
import { ethers } from 'ethers';

// Testnet Screener Assistants
export const notifierListScreenerTestnet: ScreenerAssistant = {
  address: '0xbcceeabf2f555631bd481813d783d7eeb7c1799c',
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
  address: '0xcc3d9c2b38499cdfdaf5de6e5ad3ee3efdaea39e',
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

export const notifierCreatorListScreenerTestnet: ScreenerAssistant = {
  address: '0xf922fab253f7e7c6e1d63323f42a870cd896b449',
  name: 'Creator Address List Screener',
  description: 'Screen transactions based on asset creator addresses (LSP4/LSP12)',
  iconPath: '/screeners/default-list.svg',
  assistantType: 'Screener',
  creatorAddress: '0xfE67D89DeBEC38592aB2FeD217b8bbb28851DF88',
  configParams: [
    {
      name: 'requireAllCreators',
      type: 'bool',
      description: 'Creator matching mode:',
      defaultValue: 'false',
      options: [
        { value: false, label: 'Any creator in list passes (OR logic)' },
        { value: true, label: 'All creators must be in list (AND logic)' }
      ]
    },
    {
      name: 'returnValueWhenInList',
      type: 'bool',
      description: 'Screening behavior for listed creators:',
      defaultValue: 'true',
      options: [
        { value: true, label: 'If creator is in list, screening passes' },
        { value: false, label: 'If creator is in list, screening fails' }
      ]
    }
  ],
  chainId: 4201,
  links: [{ name: 'X', url: 'https://x.com/yearone_io' }],
};

export const notifierCreatorCurationScreenerTestnet: ScreenerAssistant = {
  address: '0xd2ecf93c3588c8da4ada3f30d434bc0cd0e1f1c4',
  name: 'Creator Curated List',
  description: 'Screen based on asset creator curation status on third party curated list',
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
      name: 'requireAllCreators',
      type: 'bool',
      description: 'Creator matching mode:',
      defaultValue: 'false',
      options: [
        { value: false, label: 'Any creator curated passes (OR logic)' },
        { value: true, label: 'All creators must be curated (AND logic)' }
      ]
    },
    {
      name: 'returnValueWhenCurated',
      type: 'bool',
      description: 'Screening behavior for curated creators:',
      defaultValue: 'true',
      options: [
        { value: true, label: 'Curation triggers pass in screening' },
        { value: false, label: 'Curation triggers failure in screening' }
      ]
    }
  ],
  chainId: 4201,
  links: [{ name: 'X', url: 'https://x.com/yearone_io' }],
};

// Mainnet Screener Assistants
export const notifierListScreenerMainnet: ScreenerAssistant = {
  address: '0x0b2e499f42f04b616f7b5ceb8bfc32902bbf91f8',
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
  address: '0xfd1fafda3b462eebe55814ceb1e8df9388f099a8',
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

export const notifierCreatorListScreenerMainnet: ScreenerAssistant = {
  address: '0xb2b5312111b252b4a26d987309845a533cd2e668',
  name: 'Creator Address List Screener',
  description: 'Screen transactions based on asset creator addresses (LSP4/LSP12)',
  iconPath: '/screeners/default-list.svg',
  assistantType: 'Screener',
  creatorAddress: '0xec1c59E78De6f840A66b6EE8E4066700Be863529',
  configParams: [
    {
      name: 'requireAllCreators',
      type: 'bool',
      description: 'Creator matching mode:',
      defaultValue: 'false',
      options: [
        { value: false, label: 'Any creator in list passes (OR logic)' },
        { value: true, label: 'All creators must be in list (AND logic)' }
      ]
    },
    {
      name: 'returnValueWhenInList',
      type: 'bool',
      description: 'Screening behavior for listed creators:',
      defaultValue: 'true',
      options: [
        { value: true, label: 'If creator is in list, screening passes' },
        { value: false, label: 'If creator is in list, screening fails' }
      ]
    }
  ],
  chainId: 42,
  links: [{ name: 'X', url: 'https://x.com/yearone_io' }],
};

export const notifierCreatorCurationScreenerMainnet: ScreenerAssistant = {
  address: '0x71c93169d2600cd98c3c9f49fc09405f49e5ef92',
  name: 'Creator Curated List',
  description: 'Screen based on asset creator curation status on third party curated list',
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
      name: 'requireAllCreators',
      type: 'bool',
      description: 'Creator matching mode:',
      defaultValue: 'false',
      options: [
        { value: false, label: 'Any creator curated passes (OR logic)' },
        { value: true, label: 'All creators must be curated (AND logic)' }
      ]
    },
    {
      name: 'returnValueWhenCurated',
      type: 'bool',
      description: 'Screening behavior for curated creators:',
      defaultValue: 'true',
      options: [
        { value: true, label: 'Curation triggers pass in screening' },
        { value: false, label: 'Curation triggers failure in screening' }
      ]
    }
  ],
  chainId: 42,
  links: [{ name: 'X', url: 'https://x.com/yearone_io' }],
};