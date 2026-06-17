import Hero from '@/components/Hero';
import { getHeroMedia } from '@/lib/media';
import {
  StorySection,
  ChefSection,
  MenuPreviewSection,
  ExperienceSection,
  ContactSection,
} from '@/components/HomeSections';

export default function HomePage() {
  const heroMedia = getHeroMedia();
  return (
    <>
      <Hero media={heroMedia} />
      <StorySection />
      <ChefSection />
      <MenuPreviewSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
}
