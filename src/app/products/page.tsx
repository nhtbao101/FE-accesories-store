'use client';

import React, { useState, useEffect } from 'react';
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb';

import ErrorMsg from '@/components/common/error-msg';
import Footer from '@/layout/footers/footer';
import ShopFilterOffCanvas from '@/components/common/shop-filter-offcanvas';
import ShopLoader from '@/components/loader/shop/shop-loader';
import ShopArea from './product-area';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getProducts } from '@/redux/features/product/products.slice';

const ShopPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);

  const { isLoading, error } = useAppSelector((state) => state.products);

  // const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const [priceValue, setPriceValue] = useState([0, 0]);
  const [selectValue, setSelectValue] = useState('');
  const [currPage, setCurrPage] = useState(1);
  // Load the maximum price once the products have been loaded
  // useEffect(() => {
  //   if (!isLoading && !isError && products?.data?.length > 0) {
  //     const maxPrice = products.data.reduce((max, product) => {
  //       return product.price > max ? product.price : max;
  //     }, 0);
  //     setPriceValue([0, maxPrice]);
  //   }
  // }, [isLoading, isError, products]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  // handleChanges
  const handleChanges = (val) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  // selectHandleFilter
  const selectHandleFilter = (e) => {
    setSelectValue(e.value);
  };

  // other props
  const otherProps = {
    priceFilterValues: {
      priceValue,
      handleChanges
    },
    selectHandleFilter,
    currPage,
    setCurrPage
  };

  return (
    <>
      <ShopBreadcrumb title="Shop Grid" subtitle="Shop Grid" />
      {isLoading ? (
        <ShopLoader loading={isLoading} />
      ) : !error && products?.data?.length === 0 ? (
        <ErrorMsg msg="No Products found!" />
      ) : (
        products.data && (
          <>
            <ShopArea
              all_products={products.data}
              products={products.data}
              otherProps={otherProps}
            />
            <ShopFilterOffCanvas
              all_products={products.data}
              otherProps={otherProps}
            />
          </>
        )
      )}
    </>
  );
};

export default ShopPage;
