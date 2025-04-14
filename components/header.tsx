"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Heart } from "lucide-react";
import Button from "./base/button";

export default function Header() {
  // Define navigation categories with names and paths
  const categories = [
    { name: "Best Sellers", path: "/" },
    { name: "New Releases", path: "/" },
    { name: "Fresh", path: "/" },
    { name: "Contact", path: "/" },
    { name: "About", path: "/" },
  ];

  return (
    // Sticky header with backdrop blur and border
    <header className="sticky  text-foreground p-3 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container m-auto flex   h-16 items-center justify-center">
        <div className="mr-4   w-full justify-between  flex">
            <Link
            href="/"
            className="mr-6 flex items-center space-x-2 font-bold text-xl"
          >
            <span className="  sm:inline-block">ShopSmart</span>
          </Link>

          {/* Desktop navigation links */}
          <nav className="flex items-center space-x-6 text-sm font-medium max-md:mt-3 max-md:hidden  ">
            {categories.map((category) => (
              <Link
                className="  hover:text-foreground/[0.8]  transition-colors"
                href={"/"}
                key={category.path}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Action buttons: Wishlist, Search, Cart, Account */}
          <div className=" flex ">
            <Button
              className=" hover:bg-foreground/[0.1] !"
              variant="fill"
              size="small"
            >
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              className=" hover:bg-foreground/[0.1] !"
              variant="fill"
              size="small"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="fill"
              size="small"
              className=" hover:bg-foreground/[0.1] !"
            >
              <ShoppingCart className="h-5 w-5 cursor-pointer" />
            </Button>

            <Button
              className=" hover:bg-foreground/[0.1] !"
              variant="fill"
              size="small"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span> {/* Accessible label */}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
