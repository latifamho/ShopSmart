
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ProductCard from "./product-card";
import { Product } from "@/types/types";

export default function ProductCarousel({
  allProducts,
}: {
  allProducts: Product[];
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        320: { slidesPerView: 1 }, 
        480: { slidesPerView: 1.5 }, 
        640: { slidesPerView: 2 },  
        768: { slidesPerView: 2.5 },  
        1024: { slidesPerView: 3 },  
        1280: { slidesPerView: 4 },  
        1536: { slidesPerView: 5 },
      }}
    >
      {allProducts.map((product: Product) => (
        <SwiperSlide key={product.id}>
          <ProductCard index={1} product={product} onClick={() => {}} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
