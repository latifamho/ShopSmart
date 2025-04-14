"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { useProductStore } from "@/store/store";
import { Product } from "@/types/types";

const MightLike = () => {
  const getProductsByCategories = useProductStore(
    (state) => state.getProductsByCategories
  );

  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const existingCategories = JSON.parse(
      localStorage.getItem("selectedCategories") || "[]"
    );

    const products = getProductsByCategories(existingCategories);

    // Group products by category
    const productsByCategory: Record<string, Product[]> = {};

    products.forEach((product) => {
      if (!productsByCategory[product.category]) {
        productsByCategory[product.category] = [];
      }
      productsByCategory[product.category].push(product);
    });

    // Take 2 random products from each category
    const randomProducts: Product[] = [];
    Object.values(productsByCategory).forEach((categoryProducts) => {
      if (categoryProducts.length <= 2) {
        // If category has 2 or fewer products, take all
        randomProducts.push(...categoryProducts);
      } else {
        // If category has more than 2 products, pick 2 randomly
        const shuffled = [...categoryProducts].sort(() => 0.5 - Math.random());
        randomProducts.push(...shuffled.slice(0, 2));
      }
    });

    setRelatedProducts(randomProducts);
  }, [getProductsByCategories]);

  const handleCardClick = (category: string) => {
    const existingCategories = JSON.parse(
      localStorage.getItem("selectedCategories") || "[]"
    );

    if (!existingCategories.includes(category)) {
      existingCategories.push(category);
    }

    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(existingCategories)
    );
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">You Might Like</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {relatedProducts.map((product: Product, index) => (
          <ProductCard
            index={index}
            key={product.id}
            product={product}
            onClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MightLike;
