import { Metadata } from 'next';
import LandingBox from '@/components/LandingBox';

export const metadata: Metadata = {
  title: 'UPAC - 🆙 Assistants Catalog',
  description: 'tbd',
};

const Home = ({ params }: { params: { network: string } }) => {
  return <LandingBox network={
    params.network
  }/>;
}
export default Home;
