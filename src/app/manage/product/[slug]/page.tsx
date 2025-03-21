'use client';

import React, { useEffect, useState } from 'react';
// internal
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import ErrorMsg from '@/components/common/error-msg';
import ProductDetailsBreadcrumb from '@/components/breadcrumb/product-details-breadcrumb';
import PrdDetailsLoader from '@/components/loader/prd-details-loader';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getProduct } from '@/redux/features/product/product.slice';
import ProductDetailsArea from './product-details-area';
import { useParams } from 'next/navigation';

const ProductDetailsPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  // example URL /posts/123
  const { slug }: any = params;
  // pid will equal 123

  const { isLoading, isSuccess, error, data }: any = useAppSelector(
    (state) => state.product.detail
  );

  useEffect(() => {
    dispatch(getProduct(slug));
  }, [slug]);

  return (
    <Wrapper>
      <SEO pageTitle="Product Details" />
      {isLoading ? (
        <PrdDetailsLoader loading={isLoading} />
      ) : !isLoading && error ? (
        <ErrorMsg msg="There was an error" />
      ) : data ? (
        <>
          <ProductDetailsBreadcrumb
            category={data.category}
            title={data.title}
          />
          <ProductDetailsArea product={data} />
        </>
      ) : null}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ProductDetailsPage;
