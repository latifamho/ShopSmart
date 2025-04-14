"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { useProductStore } from "@/store/store";
import { Product } from "@/types/types";
import { Loader } from "lucide-react";

const MightLike = () => {
  const getProductsByCategories = useProductStore(
    (state) => state.getProductsByCategories
  );
  const getAllProducts = useProductStore((state) => state.products);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [hasSelectedCategories, setHasSelectedCategories] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCategories = localStorage.getItem("selectedCategories");
    const existingCategories = storedCategories
      ? JSON.parse(storedCategories)
      : [];

    // Check if there are any selected categories
    const hasCategories = existingCategories.length > 0;
    setHasSelectedCategories(hasCategories);

    let products: Product[] = [];

    if (hasCategories) {
      // If there are categories, get products by those categories
      products = getProductsByCategories(existingCategories);

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
        if (categoryProducts.length <= 3) {
          randomProducts.push(...categoryProducts);
        } else {
          const shuffled = [...categoryProducts].sort(
            () => 0.5 - Math.random()
          );
          randomProducts.push(...shuffled.slice(0, 2));
        }
      });

      setRelatedProducts(randomProducts);
    } else {
      // If no categories, get 4 random products from all products
      const shuffled = [...getAllProducts].sort(() => 0.5 - Math.random());
      setRelatedProducts(shuffled.slice(0, 4));
    }
    setLoading(false);
  }, [getProductsByCategories, getAllProducts]);
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
    setHasSelectedCategories(true);
  };

  return (
    <div className="space-y-4 py-4">
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {hasSelectedCategories ? "You Might Like" : "Trending"}
          </h2>
        </div>
      )}
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
