import Hero from '@/components/Hero';
import {
  StorySection,
  ChefSection,
  MenuPreviewSection,
  ExperienceSection,
  ReserveSection,
  ContactSection,
} from '@/components/HomeSections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StorySection />
      <ChefSection />
      <MenuPreviewSection />
      <ExperienceSection />
      <ReserveSection />
      <ContactSection />
    </>
  );
}
