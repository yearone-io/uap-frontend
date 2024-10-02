// utils/fetchAssets.ts

export interface IAssetImage {
  url: string;
  width: number;
  height: number;
  verified?: boolean;
  error?: boolean;
}

// Interface for Asset Link
export interface IAssetLink {
  url: string;
  title: string;
}

// Interface for Asset
export interface IAsset {
  id: string; // Asset ID (like "0xabc123...")
  lsp4TokenName: string; // Name of the asset (e.g., "TokenName")
  lsp4TokenSymbol: string; // Token symbol (e.g., "TKN")
  lsp4TokenType: string; // Type of token
  standard: string; // Standard type (e.g., LSP4, ERC20, etc.)
  blockNumber: number; // Block number when the asset was created
  decimals: number; // Decimal precision for the token
  totalSupply: string; // Total supply of the token
  images: IAssetImage[]; // Array of asset images
  icons: IAssetImage[]; // Array of asset icons
  links: IAssetLink[]; // Array of links related to the asset
}

export const fetchAssets = async (): Promise<any> => {
  try {
    const response = await fetch(
      'https://envio.lukso-mainnet.universal.tech/v1/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
              query assetShowcase {
                assets: Asset(
                  limit: 500
                  distinct_on: lsp4TokenName
                  order_by: [{lsp4TokenName: asc}, {blockNumber: desc}]
                  where: {
                    _and: [
                      { images: { url: { _is_null: false } } },
                      { lsp4TokenName: { _is_null: false } },
                      { lsp4TokenName: { _neq: "" } },
                      { lsp4TokenName: { _nilike: "%test%" } },
                      { links: { url: { _is_null: false } } },
                      { links: { url: { _neq: "" } } }
                    ]
                  }
                ) {
                  ...basicAsset
                }
              }
    
              fragment basicAsset on Asset {
                id
                lsp4TokenName
                lsp4TokenSymbol
                lsp4TokenType
                standard
                blockNumber
                decimals
                totalSupply
                images(order_by: { index: asc, width: desc }) {
                  url: src
                  width
                  height
                  index
                  verified
                  error
                }
                icons(order_by: { width: desc }) {
                  url: src
                  width
                  height
                  verified
                  error
                }
                links {
                  url
                  title
                }
              }
            `,
          operationName: 'assetShowcase',
        }),
      }
    );

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.assets;
  } catch (error) {
    // @ts-ignore
    throw new Error(`Failed to fetch assets: ${error.message}`);
  }
};

const restrictedDomains = [
  'facebook.com',
  'instagram.com',
  'x.com',
  'twitter.com',
  'linkedin.com',
  'tiktok.com',
  'pinterest.com',
  'reddit.com',
  'youtube.com',
  'snapchat.com',
  'whatsapp.com',
  'discord.com',
  'twitch.tv',
  'medium.com',
  'quora.com',
  'github.com',
  'spotify.com',
  'soundcloud.com',
  'google.com',
  'amazon.com',
  'ebay.com',
  't.me',
  'linktr.ee',
  'app.cg',
  'podbean.com',
  'foundation.app',
  'lukso.network',
  'opensea.io',
  'discord.gg',
  'azuki.com',
  'behance.net',
  'lukso.io',
];

export const filterRestrictedURLs = (links: IAssetLink[]): IAssetLink[] => {
  return links.filter(link => {
    try {
      const domain = new URL(link.url).hostname.replace('www.', '');
      return !restrictedDomains.some(restrictedDomain =>
        domain.includes(restrictedDomain)
      );
    } catch (error) {
      // In case the URL is invalid, we filter it out by default
      return false;
    }
  });
};

export const getRandomAsset = (assets: IAsset[]): IAsset => {
  const randomAsset = assets[Math.floor(Math.random() * assets.length)];

  randomAsset.links = filterRestrictedURLs(randomAsset.links);

  if (randomAsset.links.length > 0) {
    return randomAsset;
  } else {
    return getRandomAsset(assets);
  }
};

export const getRandomLinkFromAsset = (asset: IAsset): IAssetLink => {
  return asset.links[Math.floor(Math.random() * asset.links.length)];
};
