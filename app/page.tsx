// Import the LandingSection and FeaturedProduct components
import FeaturedProduct from "@/components/featured-product";
import LandingSection from "@/components/landing-section";
import MightLike from "@/components/Might-like-products";

// Home page component
export default function Home() {
  return (
    // Container with padding and responsive layout
    <div className=" m-auto container   px-4 py-8 md:px-6  md:py-12">
      {/* Top landing section of the homepage */}
      <LandingSection />

      {/* You might also like section */}
      <MightLike />
      {/* Section displaying featured products */}
      <FeaturedProduct />
    </div>
  );
}
