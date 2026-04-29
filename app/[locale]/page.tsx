import { setRequestLocale } from "next-intl/server";
import { BasePageProps } from "@/types/page-props";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { OccasionsSection } from "@/components/occasions-section";
import { EventsSection } from "@/components/events-section";
import { ProductsSection } from "@/components/products-section";
import { GallerySection } from "@/components/gallery-section";
import { ReviewsSection } from "@/components/reviews-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

const HomePage = async ({ params }: BasePageProps) => {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Preload hero poster as LCP image — hoisted to <head> by React */}
      <link rel="preload" as="image" href="/images/hero/hero.jpg" fetchPriority="high" />
      <main>
        <HeroSection />
        <EventsSection />
        <OccasionsSection />
        <ProductsSection />
        <GallerySection />
        <ReviewsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
