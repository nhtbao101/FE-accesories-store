'use client';

import React, { useState, useEffect } from 'react';
import DetailsThumbWrapper from './details-thumb-wrapper';
import DetailsWrapper from './details-wrapper';

import { useRouter } from 'next/navigation';

import DetailsTabNav from './details-tab-nav';
import RelatedProducts from '../related-products';
// import { getProduct } from '@/redux/features/product/product.slice';

const ProductDetailsArea = ({ product }) => {
  const router = useRouter();

  console.log('productasx', product);
  const { slug, image, imageURLs, videoId } = product || {};
  const [activeImg, setActiveImg] = useState(image);

  console.log('image', image);
  // active image change when img change

  console.log('route', router);
  // console.log('productItem', productItem);

  useEffect(() => {
    if (product) {
      setActiveImg(product.image);
    }
  }, [product]);

  // handle image active
  const handleImageActive = (item) => {
    setActiveImg(item.image);
  };
  return (
    <>
      {product && (
        <section className="tp-product-details-area">
          <div className="tp-product-details-top pb-115">
            <div className="container">
              <div className="row">
                <div className="col-xl-7 col-lg-6">
                  {/* product-details-thumb-wrapper start */}
                  <DetailsThumbWrapper
                    activeImg={activeImg}
                    handleImageActive={handleImageActive}
                    imageURLs={imageURLs}
                    imgWidth={580}
                    imgHeight={670}
                    videoId={videoId}
                    // status={status}
                  />
                  {/* product-details-thumb-wrapper end */}
                </div>
                <div className="col-xl-5 col-lg-6">
                  {/* product-details-wrapper start */}
                  <DetailsWrapper
                    productItem={product}
                    handleImageActive={handleImageActive}
                    activeImg={activeImg}
                    detailsBottom={true}
                  />
                  {/* product-details-wrapper end */}
                </div>
              </div>
            </div>
          </div>

          {/* product details description */}
          <div className="tp-product-details-bottom pb-140">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <DetailsTabNav product={product} />
                </div>
              </div>
            </div>
          </div>
          {/* product details description */}

          {/* related products start */}
          <section className="tp-related-product pt-95 pb-50">
            <div className="container">
              <div className="row">
                <div className="tp-section-title-wrapper-6 text-center mb-40">
                  <span className="tp-section-title-pre-6">
                    Next day Products
                  </span>
                  <h3 className="tp-section-title-6">Related Products</h3>
                </div>
              </div>
              <div className="row">
                <RelatedProducts id={slug} />
              </div>
            </div>
          </section>
          {/* related products end */}
        </section>
      )}
    </>
  );
};

export default ProductDetailsArea;
