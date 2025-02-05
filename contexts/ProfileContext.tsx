'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

interface Profile {
  name: string;
  description: string;
  tags: string[];
  links: Link[];
  profileImage: Image[];
  backgroundImage: Image[];
  mainImage: string | undefined;
}

interface Link {
  title: string;
  url: string;
}

interface Image {
  width: number;
  height: number;
  hashFunction: string;
  hash: string;
  url: string;
}

interface MainControllerData {
  mainUPController: string;
  upWallet: string;
}

interface ProfileContextType {
  profile: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  issuedAssets: string[];
  setIssuedAssets: React.Dispatch<React.SetStateAction<string[]>>;
  mainControllerData: MainControllerData | null;
  setMainControllerData: React.Dispatch<
    React.SetStateAction<MainControllerData | null>
  >;
}

const initialProfileContextValue: ProfileContextType = {
  profile: null,
  setProfile: () => {},
  issuedAssets: [],
  setIssuedAssets: () => {},
  mainControllerData: null,
  setMainControllerData: () => {},
};

const ProfileContext = createContext<ProfileContextType>(
  initialProfileContextValue
);

export function useProfile() {
  return useContext(ProfileContext);
}

export function ProfileProvider({
                                  children,
                                }: Readonly<{ children: React.ReactNode }>) {
  const { address } = useWeb3ModalAccount();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [issuedAssets, setIssuedAssets] = useState<string[]>([]);
  const [mainControllerData, setMainControllerData] =
    useState<MainControllerData | null>(null);

  // 1) Load both profile and controller data from local storage
  useEffect(() => {
    // If no address, just clear
    if (!address) {
      setProfile(null);
      setMainControllerData(null);
      return;
    }

    const storedProfileData = localStorage.getItem('profileData');
    if (storedProfileData) {
      const parsed = JSON.parse(storedProfileData);
      if (parsed.account === address) {
        setProfile(parsed.data);
      } else {
        setProfile(null);
      }
    } else {
      setProfile(null);
    }

    const storedControllerData = localStorage.getItem('mainControllerData');
    if (storedControllerData) {
      setMainControllerData(JSON.parse(storedControllerData));
    } else {
      setMainControllerData(null);
    }
  }, [address]);

  // 2) Whenever mainControllerData changes, write to local storage (or remove)
  useEffect(() => {
    if (mainControllerData) {
      localStorage.setItem(
        'mainControllerData',
        JSON.stringify(mainControllerData)
      );
    } else {
      localStorage.removeItem('mainControllerData');
    }
  }, [mainControllerData]);

  // Collect values in a memo to avoid re-creating the context on every render
  const contextValue = useMemo(
    () => ({
      profile,
      setProfile,
      issuedAssets,
      setIssuedAssets,
      mainControllerData,
      setMainControllerData,
    }),
    [profile, issuedAssets, mainControllerData]
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}
