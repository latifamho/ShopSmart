/* eslint-disable react-hooks/rules-of-hooks */
"use client"; // Indicates this is a client component in Next.js

// Import components and utilities
import Button from "@/components/base/button";
import { ImageCarousel } from "@/components/product-image-carousel";
import ProductReviews from "@/components/product-reviews";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames
import { Check, Heart, ShoppingCart } from "lucide-react"; // Icons
import MighLike from "@/components/Might-like-products";
import { useProductStore } from "@/store/store"; // Zustand store for product state
import { useState } from "react"; // React state hook
import RelatedProducts from "@/components/related-products";

// Props interface for the page component
interface ProductPageProps {
  params: {
    id: string;
  };
}

// Main component for the product page
export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  // Fetch product by ID from the Zustand store
  const getProductById = useProductStore((state) => state.getProductById);
  const product = getProductById(id as string);

  // Render a "Not Found" message if product is not available
  if (!product) {
    return (
      <div className=" felx items-center justify-center ">Not Found !</div>
    );
  }

  // Local state for wishlist and cart toggles
  const [isFavorited, seIsFavorite] = useState<boolean>(product?.isFavorited);
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);
  const [added, setAdded] = useState<boolean>(product?.addedToCard);
  const toggleBuyCard = useProductStore((state) => state.toggleBuyCard);

  return (
    <div className="mx-auto container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex max-lg:flex-col lg:gap-14   max-lg:gap-4 justify-center!">
        {/* Image carousel for the product */}
        <ImageCarousel />

        <div className="space-y-9">
          {/* Product name, rating, and stock info */}
          <div>
            <h1 className="text-3xl font-bold">{product?.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center">
                <span className="font-medium">{product?.rating}</span>
                <span className="mx-2">★</span>
                <span className="text-muted-foreground">
                  ({product?.reviewCount} reviews)
                </span>
              </div>
              <span className="text-muted-foreground">
                In Stock: {product?.stock}
              </span>
            </div>
          </div>

          {/* Product price */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">${product?.price}</span>
          </div>

          {/* Product description */}
          <div>
            <h2 className="text-lg font-medium">Description</h2>
            <p className="mt-2 text-muted-foreground">{product?.description}</p>
          </div>

          {/* Add to cart and wishlist buttons */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                setAdded(!added); // Toggle cart state
                toggleBuyCard(product.id); // Update cart in store
              }}
              className={`flex-1 ${
                added
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-foreground hover:bg-secondary-dark"
              }`}
              size="medium"
              color="secondary"
              variant="fill"
            >
              {added ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Added to cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to cart
                </>
              )}
            </Button>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                seIsFavorite(!isFavorited); // Toggle wishlist state
                toggleFavorite(product.id); // Update wishlist in store
              }}
              color="secondary"
              variant="fill"
              size="medium"
              className={cn(
                product?.isFavorited &&
                  "text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 hover:bg-foreground/[0.8]"
              )}
            >
              <Heart
                className={cn(
                  "mr-2 h-5 w-5",
                  product?.isFavorited && "fill-red-500"
                )}
              />
              {product?.isFavorited
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </div>

      {/* Customer reviews */}
      <ProductReviews />

      {/* Related products based on the same category */}
      <RelatedProducts category={product.category} />

      {/* You might also like section */}
      <MighLike />
    </div>
  );
}
