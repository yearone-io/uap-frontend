// utils/fetchProfiles.ts

export interface IProfileImage {
  url: string;
  width: number;
  height: number;
  verified?: boolean;
  error?: boolean;
}

// Interface for Profile Link
export interface IProfileLink {
  url: string;
  title: string;
}

// Interface for Profile
export interface IProfile {
  id: string; // Profile address (like "0xabc123...")
  name: string; // Name of the profile (e.g., "Tehnalogos")
  profileImages: IProfileImage[]; // Array of profile images
  backgroundImages: IProfileImage[]; // Array of background images
  links: IProfileLink[]; // Array of links related to the profile
  blockNumber: number; // Block number when the profile was created
}

export const fetchProfiles = async (createdTimestamp: number): Promise<any> => {
  // 1726576893
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
            query profileShowcase($createdTimestamp: Int!) {
              profiles: Profile(
                limit: 500
                where: {
                  _and: [
                    { profileImages: { url: { _is_null: false } } },
                    { backgroundImages: { url: { _is_null: false } } },
                    { name: { _is_null: false } },
                    { name: { _neq: "" } },
                    { followed_aggregate: { count: { predicate: { _gte: 5 } } } },
                    { createdTimestamp: { _lte: $createdTimestamp } },
                    { links: { url: { _is_null: false } } },
                    { links: { url: { _neq: "" } } }
                  ]
                }
                order_by: { blockNumber: desc }
              ) {
                ...basicProfile
              }
            }
  
            fragment basicProfile on Profile {
              name
              id
              backgroundImages(order_by: { width: desc }, limit: 1) {
                url: src
                height
                width
                verified
                error
              }
              profileImages(order_by: { width: desc }, limit: 1) {
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
              blockNumber
            }
            `,
          variables: { createdTimestamp },
          operationName: 'profileShowcase',
        }),
      }
    );

    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data.profiles;
  } catch (error) {
    // @ts-ignore
    throw new Error(`Failed to fetch profiles: ${error.message}`);
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

export interface IProfileLink {
  url: string;
  title: string;
}

export const filterRestrictedURLs = (links: IProfileLink[]): IProfileLink[] => {
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

export const getRandomProfile = (universalProfiles: IProfile[]): IProfile => {
  const randomProfile =
    universalProfiles[Math.floor(Math.random() * universalProfiles.length)];
  // exclude all links to x.com or twitter.com
  randomProfile.links = filterRestrictedURLs(randomProfile.links);

  if (randomProfile.links.length > 0) {
    return randomProfile;
  } else {
    return getRandomProfile(universalProfiles);
  }
};

export const getRandomLink = (profile: IProfile): IProfileLink => {
  return profile.links[Math.floor(Math.random() * profile.links.length)];
};
