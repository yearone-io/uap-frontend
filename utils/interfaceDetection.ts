'use client';
import { ethers } from 'ethers';
import lsp3ProfileMetadataSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import lsp4DigitalAssetSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';
import { SupportedStandards } from '@lukso/lsp-smart-contracts';
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import erc165ABI from '@/constants/ERC165ABI.json';
import { supportedNetworks } from '@/constants/supportedNetworks';
import { DecodeDataOutput } from '@erc725/erc725.js/build/main/src/types/decodeData';
import { hashData } from '@erc725/erc725.js/build/main/src/lib/utils';
import { URLDataWithHash } from '@erc725/erc725.js/build/main/src/types';

/*
 * Initialize base provider to get current blockchain network
 * The RPC URL can also be passed as string manually, see:
 * https://docs.lukso.tech/tools/erc725js/getting-started
 */
const providerObject =
  typeof window !== 'undefined' && (window.lukso || window.ethereum);
const provider = providerObject
  ? new ethers.BrowserProvider(providerObject)
  : null;

/**
 * Checks if a smart contract has a certain ERC165 interface.
 *
 * @param contractAddress smart contract to call.
 * @param interfaceId interface ID to check.
 * @returns true if interface was detected.
 */
export async function supportsInterface(
  contractAddress: string,
  interfaceId: string
): Promise<boolean> {
  if (!provider) {
    console.error('Provider not available.');
    return false;
  }
  const contract = new ethers.Contract(contractAddress, erc165ABI, provider);
  try {
    return await contract.supportsInterface(interfaceId);
  } catch (error) {
    console.error('Error checking interface support:', error);
    return false;
  }
}

export interface IContractInterfaceDetails {
  status: boolean;
  data: any[];
  isMetadataVerified: boolean;
  isImageDataVerified: boolean;
}

export interface IEntryInterfaces {
  isLSP3Profile: IContractInterfaceDetails;
  isLSP4DigitalAsset: IContractInterfaceDetails;
  isUknownContract: IContractInterfaceDetails;
}

export const getEmptyInterfaceDetails = (): IEntryInterfaces => {
  return {
    isLSP3Profile: {
      status: false,
      data: [],
      isMetadataVerified: false,
      isImageDataVerified: false,
    },
    isLSP4DigitalAsset: {
      status: false,
      data: [],
      isMetadataVerified: false,
      isImageDataVerified: false,
    },
    isUknownContract: {
      status: false,
      data: [],
      isMetadataVerified: false,
      isImageDataVerified: false,
    },
  };
};

export async function verifyDataIntegrity(
  data: string | Uint8Array,
  verificationHash: string,
  verificationMethod: string
): Promise<boolean> {
  const hashedData = hashData(data, verificationMethod);
  return verificationHash === hashedData;
}

// Helper function to fetch and convert image to Uint8Array
export async function fetchImageBytes(
  ipfsGateway: string,
  ipfsUrl: string
): Promise<Uint8Array> {
  const imageUrl = `${ipfsGateway}/${ipfsUrl.replace('ipfs://', '')}`;
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from ${imageUrl}`);
  }
  const imageBlob = await response.blob();
  return new Uint8Array(await imageBlob.arrayBuffer());
}

export const fetchImageAsFile = async (
  ipfsGateway: string,
  ipfsUrl: string
): Promise<File | null> => {
  try {
    const ipfsHash = ipfsUrl.replace('ipfs://', '');
    const imageUrl = `${ipfsGateway}/${ipfsHash}`;
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Convert Blob to File by creating a new File object
    const file = new File([blob], ipfsHash, { type: blob.type });
    return file;
  } catch (error) {
    console.error('Error fetching image from URL:', error);
    return null;
  }
};

// Generic function to verify all images in an array
async function verifyImageDataArray(
  imageDataArray: any[],
  ipfsGateway: string
): Promise<boolean> {
  if (!imageDataArray || imageDataArray.length === 0) {
    return true;
  }
  return await Promise.all(
    imageDataArray.map(async imageData => {
      try {
        const imageBytes = await fetchImageBytes(ipfsGateway, imageData.url);

        // Verify image integrity
        return verifyDataIntegrity(
          imageBytes,
          imageData.verification.data,
          imageData.verification.method
        );
      } catch (error) {
        console.error(`Verification failed for image: ${imageData.url}`, error);
        return false; // If any image fails, return false
      }
    })
  ).then(results => results.every(isValid => isValid)); // Return true if all images pass verification
}

export async function readInterfaces(
  address: string,
  networkId: number
): Promise<IEntryInterfaces> {
  let contractMetadata: IEntryInterfaces = getEmptyInterfaceDetails();
  try {
    let result: DecodeDataOutput[] = [];
    const currentNetwork = supportedNetworks[networkId];
    const ipfsGateway = currentNetwork.ipfsGateway;
    const erc725js = new ERC725(
      [
        ...lsp3ProfileMetadataSchema,
        ...lsp4DigitalAssetSchema,
      ] as ERC725JSONSchema[],
      address,
      currentNetwork.rpcUrl,
      { ipfsGateway: currentNetwork.ipfsGateway }
    );
    result = await erc725js.getData([
      'SupportedStandards:LSP3Profile',
      'SupportedStandards:LSP4DigitalAsset',
      'LSP3Profile',
      'LSP4TokenName',
      'LSP4TokenSymbol',
      'LSP4Metadata',
    ]);
    // LSP3 Metadata
    if (result[0].value == SupportedStandards.LSP3Profile.value) {
      contractMetadata.isLSP3Profile.status = true;
      const LSP3ProfileIPFSData = result.filter(
        r =>
          r.name.includes('LSP3Profile') &&
          !r.name.includes('SupportedStandards')
      );
      const profileUrl: DecodeDataOutput = LSP3ProfileIPFSData[0];
      const ipfsHash = (profileUrl.value as URLDataWithHash).url.replace(
        'ipfs://',
        ''
      );
      const ipfsUrl = `${ipfsGateway}/${ipfsHash}`;
      const verificationData = (profileUrl.value as URLDataWithHash)
        .verification;
      const LSP3ProfileMetadata = await fetch(ipfsUrl);
      const rawData = await LSP3ProfileMetadata.text();
      const data = JSON.parse(rawData);
      contractMetadata.isLSP3Profile.data = [data.LSP3Profile];
      contractMetadata.isLSP3Profile.isMetadataVerified =
        await verifyDataIntegrity(
          rawData,
          verificationData.data,
          verificationData.method
        );
      // verify profile image and background image arrays
      const isProfileImageDataValid = await verifyImageDataArray(
        data.LSP3Profile.profileImage,
        ipfsGateway
      );
      const isBackgroundImageDataValid = await verifyImageDataArray(
        data.LSP3Profile.backgroundImage,
        ipfsGateway
      );
      contractMetadata.isLSP3Profile.isImageDataVerified =
        isProfileImageDataValid && isBackgroundImageDataValid;
    }

    // LSP4 Metadata
    if (result[1].value == SupportedStandards.LSP4DigitalAsset.value) {
      contractMetadata.isLSP4DigitalAsset.status = true;
      const LSP4MetadataIPFSData = result.filter(
        r =>
          r.name.includes('LSP4Metadata') &&
          !r.name.includes('SupportedStandards')
      );
      const assetUrl: DecodeDataOutput = LSP4MetadataIPFSData[0];
      const ipfsHash = (assetUrl.value as URLDataWithHash).url.replace(
        'ipfs://',
        ''
      );
      const ipfsUrl = `${ipfsGateway}/${ipfsHash}`;
      const verificationData = (assetUrl.value as URLDataWithHash).verification;
      const LSP4Metadata = await fetch(ipfsUrl);
      const data = await LSP4Metadata.json();
      contractMetadata.isLSP4DigitalAsset.data = [
        data.LSP4Metadata,
        result[3],
        result[4],
      ];
      contractMetadata.isLSP4DigitalAsset.isMetadataVerified =
        await verifyDataIntegrity(
          JSON.stringify(data),
          verificationData.data,
          verificationData.method
        );
      // verify profile image and background image arrays
      const isIconImageDataValid = await verifyImageDataArray(
        data.LSP4Metadata.icon,
        ipfsGateway
      );
      const isMainImageDataValid = await verifyImageDataArray(
        data.LSP4Metadata.images[0],
        ipfsGateway
      );
      contractMetadata.isLSP4DigitalAsset.isImageDataVerified =
        isIconImageDataValid && isMainImageDataValid;
    }
    // Metadata unknown
    contractMetadata.isUknownContract.status =
      !contractMetadata.isLSP3Profile.status &&
      !contractMetadata.isLSP4DigitalAsset.status;
    return contractMetadata;
  } catch (error) {
    console.log('Error reading interfaces for: ', address, error);
    return contractMetadata;
  }
}

export const getContractLabels = (interfaces: any) => {
  let contractLabels = [];
  if (interfaces.isLSP3Profile && interfaces.isLSP3Profile.status) {
    contractLabels.push('Universal Profile');
  }
  if (interfaces.isLP4DigitalAsset && interfaces.isLP4DigitalAsset.status) {
    contractLabels.push('Digital Asset');
  }
  if (interfaces.isUknownContract && interfaces.isUknownContract.status) {
    contractLabels.push('Unknown Contract');
  }
  return contractLabels;
};
