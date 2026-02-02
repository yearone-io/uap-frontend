import { ScreenerAssistant } from './CustomTypes';
import { ethers } from 'ethers';

// Testnet Screener Assistants
export const notifierListScreenerTestnet: ScreenerAssistant = {
  address: '0x2ef7919a6e715700b8bccfe2106bef4887f28507',
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
  address: '0x6dd041d25b637eed30ebb8aeb44bf59bfb2a3aff',
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
  address: '0x8f6820e24d3cbd63e87fc0b791844d8b3106bb94',
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
  address: '0xaeae6c5fdbcb2e3201ceaa32edfb213534429dae',
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
  address: '0x2e1fc250e758651bd0ab0edc355d7986ab138edc',
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
  address: '0x56d3ef8a7bf8b04b51ff7c9f4b5d7e4e375b2664',
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
  address: '0x6031249b8f0427fa7ac4092706eb7a6d53141451',
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
  address: '0x844472b633c0911dd3fe4c335e8764e2510c180d',
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