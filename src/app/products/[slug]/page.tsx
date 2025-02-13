'use client';

import React, { useEffect } from 'react';
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

const ProductDetailsPage = () => {
  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, error, data } = useAppSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getProduct('ring'));
  }, []);
  // decide what to render
  let content = null;
  if (isLoading) {
    content = <PrdDetailsLoader loading={isLoading} />;
  }
  if (!isLoading && error) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !error && data) {
    content = (
      <>
        <ProductDetailsBreadcrumb category={data.category} title={data.title} />
        <ProductDetailsArea product={data} />
      </>
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle="Product Details" />
      <HeaderTwo style_2={true} />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ProductDetailsPage;
