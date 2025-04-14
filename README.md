# ShopSmart

dynamic e commerce user interface that delivers a personalized shopping experience.

Overview
This project is an AI-powered recommendation system for e-commerce websites. It tracks user behavior (visited categories) and suggests relevant products using Local storage to remember user preferences.

## Features

- **Interactive UI**

  - Visual feedback on cart actions (success state with animation)
  - Hover effects on product images
  - Responsive grid layout

- **Type-Safe**

  - Fully typed with TypeScript
  - Product data validation

- **Performance Optimized**
  - Next.js Image component
  - Efficient state management

✅ Personalized Recommendations – "You Might Like" section based on browsing history.
✅ Performance Optimized – Uses Zustand for state management.
✅ Easy Integration – Works with any React/Next.js e-commerce app.

# Clone the repo

git clone https://github.com/latifamho/ShopSmart.git
cd ShopSmart

# Install dependencies

npm install

# Start dev server

npm run dev

 Deploy to Production
# Build for production
npm run build

# Start the server
npm start



 ## Project Structure


app/
└── (pages}/
     └── product /              #
         └──    [id]             #Product detail page
components
└── base/
│   └── button.ts               #custom button
│   └── styling.helper.ts       #syling for the button
│           #
├── ui/
│   └── button.tsx            #shadcn button 
│   └── card.tsx              #shadcn card
│   └── carousel.tsx          #shadcn carousel
└── featured-product.tsx  
└── footer.tsx  
└── header.tsx  
└── landing-section.tsx  
└── Might-like-products.tsx  
└── motion-div.tsx  
└── product-card.tsx  
└── product-image-carousel.tsx  
└── product-reviews.tsx  
└── products-carousel.tsx  
└── related-rpoducts.tsx  
lib
└── utils.ts  
store
└── fake-data.ts 
└── store.ts 
types
└── types.tsx  
