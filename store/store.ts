import { ProductStore, ReviewStore } from "@/types/types";
import { create } from "zustand";
import { fakeReviews, featuredProducts } from "./fake-data";

// Create a store for managing product state and actions
export const useProductStore = create<ProductStore>((set, get) => ({
  // Initial state: an array of featured products
  products: featuredProducts,

  // Get a product by its ID
  getProductById: (id: string) => {
    // Find the product by matching its ID
    return get().products.find((product) => product.id === id);
  },

  // Get products by an array of categories
  getProductsByCategories: (categories: string[]) => {
    // Filter products that belong to one of the specified categories
    return get().products.reverse().filter((product) =>
      categories.includes(product.category)
    );
  },

  // Get products by a single category
  getProductsByCategory: (category: string) => {
    // Filter products that belong to the specified category
    return get().products.filter((product) => product.category === category);
  },

  // Get all products (no filtering)
  getAllProducts: () => get().products,

  // Toggle the 'isFavorited' state of a product by its ID
  toggleFavorite: (id: string) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, isFavorited: !product.isFavorited } // Toggle the favorite state
          : product
      ),
    }));
    
  },

  // Toggle the 'addedToCard' state of a product by its ID
  toggleBuyCard: (id: string) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, addedToCard: !product.addedToCard } // Toggle the cart state
          : product
      ),
    }));
  },
}));

// Create a store for managing review state and actions
export const useReviewStore = create<ReviewStore>((set, get) => ({
  // Initial state: an array of fake reviews with an additional `hasVoted` property
  reviews: fakeReviews.map((review) => ({ ...review, hasVoted: false })),

  // Get all reviews
  getAllReviews: () => get().reviews,

  // Toggle the 'helpful' vote on a review (for the thumbs up button)
  toggleHelpful: (id: string) => {
    set((state) => ({
      reviews: state.reviews.map((review) => {
        if (review.id === id) {
          // Toggle the 'hasVoted' state and update the 'helpful' vote count
          const hasVoted = review.hasVoted ?? false;
          const helpful = hasVoted ? review.helpful - 1 : review.helpful + 1;
          return { ...review, helpful, hasVoted: !hasVoted }; // Return the updated review
        }
        return review; // Return the review unchanged if it's not the one being toggled
      }),
    }));
  },
}));
