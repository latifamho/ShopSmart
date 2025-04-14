"use client";

import Link from "next/link";
import { Check, Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Button from "./base/button";
import { Product } from "@/types/types";
import { useProductStore } from "@/store/store";
import { MotionDiv } from "./motion-div";

// Variants for the motion animation of the card
const variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: { opacity: 1, y: 0 },
};

export default function ProductCard({
  product,
  onClick,
  index,
}: {
  product: Product;
  onClick: (category: string) => void;
  index: number;
}) {
  // Access functions from the product store to toggle favorite and cart status
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);
  const toggleBuyCard = useProductStore((state) => state.toggleBuyCard);

  // Fetch the product data from the store by its ID
  const productFromStore = useProductStore((state) =>
    state.getProductById(product.id)
  );

  // Check if the product is marked as a favorite or added to the cart
  const isFavorited = productFromStore?.isFavorited ?? false;
  const isAdded = productFromStore?.addedToCard ?? false;

  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25, // Delay animation for each product card based on its index
        ease: "easeInOut",
        duration: 0.8,
      }}
      viewport={{ once: true, amount: 0.2 }} // Trigger animation when it's 20% visible
    >
      <Card
        onClick={() => onClick(product.category)} // Handle category click for filtering
        className="overflow-hidden transition-all duration-300 hover:shadow-md"
      >
        {/* Link to the product details page */}
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            {/* Product image */}
            <Image
              src="/landing.jpeg"
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500  hover:scale-120`}
            />
          </div>
        </Link>

        {/* Product details (name, rating, and reviews) */}
        <CardContent className="p-4">
          <div className="space-y-1">
            <h3 className="font-medium line-clamp-1">{product.name}</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="ml-1 text-sm">{product.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
        </CardContent>

        {/* Product footer with action buttons (favorite, add to cart) */}
        <CardFooter className="p-2 pt-0">
          <div className="flex items-center w-full">
            {/* Favorite button */}
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click from triggering
                toggleFavorite(product.id); // Toggle product favorite status
              }}
              variant="outline"
              className={cn(
                "rounded-full transition-colors",
                isFavorited && "text-red-500 hover:text-red-600 border-red-200"
              )}
              aria-label={
                isFavorited ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart className={cn("h-4 w-4", isFavorited && "fill-red-500")} />
            </Button>

            {/* Add to cart button */}
            <Button
              variant="fill"
              size="medium"
              className={`py-2 rounded-full text-muted w-full transition-colors duration-300 ${
                isAdded
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-foreground hover:bg-secondary-dark"
              }`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click from triggering
                toggleBuyCard(product.id); // Toggle product add-to-cart status
              }}
            >
              {isAdded ? (
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
          </div>
        </CardFooter>
      </Card>
    </MotionDiv>
  );
}
