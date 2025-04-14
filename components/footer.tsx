import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

// Define footer data for cleaner mapping
const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "Electronics", href: "/" },
      { label: "Clothing", href: "/" },
      { label: "Home & Kitchen", href: "/" },
      { label: "Beauty", href: "/" },
      { label: "Sports", href: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/" },
      { label: "Shipping Information", href: "/" },
      { label: "Returns & Exchanges", href: "/" },
      { label: "Contact Us", href: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
    ],
  },
];

// Define social media icons with accessible labels
const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto container px-4 py-8 md:px-6 lg:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info & Social Icons */}
          <div>
            <h3 className="text-lg font-medium">ShopSmart</h3>
            <p className="mt-2 text-sm text-foreground">
              Your personalized shopping destination for the best products and
              deals.
            </p>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map(({ icon: Icon, label, href }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Dynamic Sections (Shop, Support, Company) */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium">{section.title}</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ShopSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
