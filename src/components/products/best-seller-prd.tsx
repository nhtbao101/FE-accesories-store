import React, { useEffect } from 'react';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// internal
import ProductItem from './product-item';
import ErrorMsg from '@/components/common/error-msg';
import { useGetProductTypeQuery } from '@/redux/features/productApi';
import { HomeTwoBestSellPrdPrdLoader } from '@/components/loader';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getProducts } from '@/redux/features/product/products.slice';

// slider setting
const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 24,
  scrollbar: {
    el: '.tp-best-swiper-scrollbar',
    draggable: true,
    dragClass: 'tp-swiper-scrollbar-drag',
    snapOnRelease: true
  },

  breakpoints: {
    1200: {
      slidesPerView: 4
    },
    992: {
      slidesPerView: 4
    },
    768: {
      slidesPerView: 2
    },
    576: {
      slidesPerView: 2
    },
    0: {
      slidesPerView: 1
    }
  }
};

const BestSellerPrd = () => {
  const { isLoading, data, error }: any = useAppSelector(
    (state) => state.products
  );

  // decide what to render
  // let content = null;

  // if (isLoading) {
  //   content = (
  //     <div className="row">
  //       <HomeTwoBestSellPrdPrdLoader loading={isLoading} />
  //     </div>
  //   );
  // }

  // console.log('content', content);
  // if (!isLoading && error) {
  //   content = <ErrorMsg msg="There was an error" />;
  // }
  // if (!isLoading && !error && data?.length === 0) {
  //   content = <ErrorMsg msg="No Products found!" />;
  // }
  // if (!isLoading && !error && data?.length > 0) {
  //   const product_items = data.slice(0, 8);
  //   content = (
  //     <Swiper
  //       {...slider_setting}
  //       modules={[Scrollbar]}
  //       className="tp-best-slider-active swiper-container mb-10"
  //     >
  //       {product_items.map((item: any, index: number) => (
  //         <SwiperSlide key={index} className="tp-best-item-4">
  //           <ProductItem product={item} />
  //         </SwiperSlide>
  //       ))}
  //     </Swiper>
  //   );
  // }
  console.log(
    'isLoading',
    useAppSelector((state) => state.products)
  );
  return (
    <>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <section className="tp-best-area pt-115">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-section-title-wrapper-4 mb-50 text-center">
                  <span className="tp-section-title-pre-4">
                    Best Seller This Week’s
                  </span>
                  <h3 className="tp-section-title-4">
                    Top Sellers In Dress for You
                  </h3>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-best-slider">
                  {/* {content} */}
                  <Swiper
                    {...slider_setting}
                    modules={[Scrollbar]}
                    className="tp-best-slider-active swiper-container mb-10"
                  >
                    {data.map((item: any, index: number) => (
                      <SwiperSlide key={index} className="tp-best-item-4">
                        <ProductItem product={item} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="tp-best-swiper-scrollbar tp-swiper-scrollbar"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BestSellerPrd;
