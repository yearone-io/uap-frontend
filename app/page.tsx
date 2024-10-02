import { Metadata } from 'next';
import LandingBox from '@/components/LandingBox';

export const metadata: Metadata = {
  title: 'UAP - Universal Assistant Protocol',
  description: 'tbd',
};

export default function Home() {
  return <LandingBox />;
}
