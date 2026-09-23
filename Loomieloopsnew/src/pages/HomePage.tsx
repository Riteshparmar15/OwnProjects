import { Hero } from '../components/home/Hero';
import { Marquee } from '../components/home/Marquee';
import { Featured } from '../components/home/Featured';
import { Categories } from '../components/home/Categories';
import { Atelier } from '../components/home/Atelier';
import { Lookbook } from '../components/home/Lookbook';
import { CustomBanner } from '../components/home/CustomBanner';

export function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Featured />
      <Categories />
      <Atelier />
      <Lookbook />
      <CustomBanner />
    </>
  );
}
