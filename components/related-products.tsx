import { useProductStore } from "@/store/store";
import { Category } from "@/types/types";
import React from "react";
import ProductCarousel from "./products-carousel";

const RelatedProducts = ({ category }: { category: Category }) => {
  // Access the function to get products by category from the product store
  const getProductsByCategory = useProductStore(
    (state) => state.getProductsByCategory
  );

  // Get the products related to the given category
  const product = getProductsByCategory(category);

  return (
    <div className="space-y-4 py-4">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Related Products </h2>
      </div>

      {/* Display the related products using a carousel */}
      <ProductCarousel allProducts={product} />
    </div>
  );
};

export default RelatedProducts;
