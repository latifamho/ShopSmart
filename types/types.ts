export type InputProps = {
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  icon?: React.ReactNode;
};
export type TTextVariants = "filled" | "standard";
export type TColorVariants = "primary" | "secondary";
export type TButtonVariants = "fill" | "outline";
export type Category =
  | "Electronics"
  | "Clothing"
  | "Home & Kitchen"
  | "Beauty"
  | "Sports";
export type Product = {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  category: Category;
  stock: number;
  isFavorited: boolean;
  addedToCard: boolean;
};

export type ProductStore = {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductsByCategories: (categories: string[]) => Product[];
  getProductsByCategory: (category: Product["category"]) => Product[];
  getAllProducts: () => Product[];
  toggleFavorite: (id: string) => void;
  toggleBuyCard: (id: string) => void;
};
export type Reviews = {
  hasVoted: boolean;
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
};
export type ReviewStore = {
  reviews: Reviews[];
  getAllReviews: () => Reviews[];
  toggleHelpful: (id: string) => void;
};
