"use client"; // This directive makes the component run on the client side

// Import required components and types
import ProductCard from "./product-card";
import { Product } from "@/types/types";
import { useProductStore } from "@/store/store";

// Component to display featured products
const FeaturedProduct = () => {
  // Fetch all products from the Zustand store
  const getAllProducts = useProductStore((state) => state.getAllProducts);
  const products = getAllProducts();

  // Handle click on a product card to store the category in local storage
  const handleCardClick = (category: string) => {
    // Retrieve existing categories from local storage
    const existingCategories = JSON.parse(
      localStorage.getItem("selectedCategories") || "[]"
    );

    // If the category is not already stored, add it
    if (!existingCategories.includes(category)) {
      existingCategories.push(category); // Add the new category
    }

    // Update local storage with the new array
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(existingCategories)
    );
  };

  return (
    <section className="mb-12">
      {/* Section heading */}
      <h2 className="mb-6 text-2xl font-bold">Featured Products</h2>

      {/* Grid layout to display product cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {products.map((product: Product, index) => (
          <ProductCard
            index={index} // Index passed for animation or identification
            key={product.id} // Unique key for each product
            product={product} // Product data passed as prop
            onClick={handleCardClick} // Click handler to save category
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
