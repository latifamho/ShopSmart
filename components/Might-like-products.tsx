"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { useProductStore, useTrendingStore } from "@/store/store";
import { Product } from "@/types/types";
import { Loader } from "lucide-react";

const MightLike = () => {
  const getProductsByCategories = useProductStore(
    (state) => state.getProductsByCategories
  );

  const trendingProducts = useTrendingStore((state) => state.getAll());

  const [youMightLike, setyouMightLike] = useState<Product[]>([]);
  const [head, setHead] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCategories = localStorage.getItem("selectedCategories");
    const existingCategories = storedCategories
      ? JSON.parse(storedCategories)
      : [];

    const hasCategories = existingCategories.length > 0;

    let selectedProducts: Product[] = [];

    if (hasCategories) {
      const products = getProductsByCategories(existingCategories);

      // Group by category
      const productsByCategory: Record<string, Product[]> = {};
      products.forEach((product) => {
        if (!productsByCategory[product.category]) {
          productsByCategory[product.category] = [];
        }
        productsByCategory[product.category].push(product);
      });

      // Take up to 2 products from each category
      Object.values(productsByCategory).forEach((group) => {
        selectedProducts.push(...group.slice(0, 2));
      });
      setHead(true);
    } else {
      // If no categories, use trending directly
      selectedProducts = trendingProducts;
    }

    setyouMightLike(selectedProducts);
    setLoading(false);
  }, [getProductsByCategories, trendingProducts]);

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
      {loading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Loader className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {head ? "You Might Like" : "Trending  "}
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {youMightLike.map((product: Product, index) => (
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
