"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { useProductStore } from "@/store/store";
import { Product } from "@/types/types";

const MighLike = () => {
  // Get the function to fetch products based on selected categories from the store
  const getProductsByCategories = useProductStore(
    (state) => state.getProductsByCategories
  );

  // State to store the related products
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // Fetch related products whenever the component mounts or categories change
  useEffect(() => {
    // Retrieve the selected categories from local storage
    const existingCategories = JSON.parse(
      localStorage.getItem("selectedCategories") || "[]"
    );

    // Get products based on the selected categories
    const products = getProductsByCategories(existingCategories);

    // Update the state with the fetched products
    setRelatedProducts(products);
  }, [getProductsByCategories]); // Depend on the `getProductsByCategories` function

  // Handle category click to add it to local storage
  const handleCardClick = (category: string) => {
    // Retrieve the existing categories from local storage
    const existingCategories = JSON.parse(
      localStorage.getItem("selectedCategories") || "[]"
    );

    // If the category isn't already selected, add it
    if (!existingCategories.includes(category)) {
      existingCategories.push(category);
    }

    // Save the updated list of categories back to local storage
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(existingCategories)
    );
  };

  return (
    <div className="space-y-4 py-4">
      {/* Title of the section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">You Might Like</h2>
      </div>

      {/* Display the related products in a responsive grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {/* Render each related product */}
        {relatedProducts.map((product: Product, index) => (
          <ProductCard
            index={index}
            key={product.id}
            product={product}
            onClick={handleCardClick} // Pass the category click handler to ProductCard
          />
        ))}
      </div>
    </div>
  );
};

export default MighLike;
