'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderTwo from '@/layout/headers/header-2';
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb';

// import { useGetAllProductsQuery } from '@/redux/features/productApi';
import ErrorMsg from '@/components/common/error-msg';
import Footer from '@/layout/footers/footer';
import ShopFilterOffCanvas from '@/components/common/shop-filter-offcanvas';
import ShopLoader from '@/components/loader/shop/shop-loader';
import ShopArea from './product-area';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getProducts } from '@/redux/features/product/products.slice';

const ShopPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);

  console.log('products', products);
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
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopLoader loading={isLoading} />;
  }
  if (!isLoading && error) {
    content = (
      <div className="pb-80 text-center">
        <ErrorMsg msg="There was an error" />
      </div>
    );
  }

  console.log('isLoading', isLoading);
  console.log('error', error);
  console.log('products data length', products);
  if (!isLoading && !error && products?.data?.length === 0) {
    content = <ErrorMsg msg="No Products found!" />;
  }
  if (!isLoading && !error && products?.data?.length > 0) {
    // products
    let product_items = products.data;
    // select short filtering
    if (selectValue) {
      if (selectValue === 'Default Sorting') {
        product_items = products.data;
      } else if (selectValue === 'Low to High') {
        product_items = products.data
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price));
      } else if (selectValue === 'High to Low') {
        product_items = products
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price));
      } else if (selectValue === 'New Added') {
        product_items = products.data
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (selectValue === 'On Sale') {
        product_items = products.data.filter((p) => p.discount > 0);
      } else {
        product_items = products.data;
      }
    }

    console.log('product_items', product_items);
    // price filter
    product_items = product_items.filter(
      (p) => p.price >= priceValue[0] && p.price <= priceValue[1]
    );

    console.log('product_itemssssss', product_items);

    // status filter
    if (searchParams.get('status')) {
      if (searchParams.get('status') === 'on-sale') {
        product_items = product_items.filter((p) => p.discount > 0);
      } else if (searchParams.get('status') === 'in-stock') {
        product_items = product_items.filter((p) => p.status === 'in-stock');
      }
    }

    // category filter
    if (searchParams.get('category')) {
      product_items = product_items.filter(
        (p) =>
          p.parent.toLowerCase().replace('&', '').split(' ').join('-') ===
          searchParams.get('category')
      );
    }

    // category filter
    if (searchParams.get('subCategory')) {
      product_items = product_items.filter(
        (p) =>
          p.children.toLowerCase().replace('&', '').split(' ').join('-') ===
          searchParams.get('subCategory')
      );
    }

    // color filter
    // if (searchParams.get('subCategory')) {
    //   product_items = product_items.filter((product) => {
    //     for (let i = 0; i < product.imageURLs.length; i++) {
    //       const color = product.imageURLs[i]?.color;
    //       if (
    //         color &&
    //         color?.name.toLowerCase().replace('&', '').split(' ').join('-') ===
    //           query.color
    //       ) {
    //         return true; // match found, include product in result
    //       }
    //     }
    //     return false; // no match found, exclude product from result
    //   });
    // }

    // brand filter
    // if (query.brand) {
    //   product_items = product_items.filter(
    //     (p) =>
    //       p.brand.name.toLowerCase().replace('&', '').split(' ').join('-') ===
    //       query.brand
    //   );
    // }

    console.log('product_items inside', product_items);
    content = (
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
    );
  }
  return (
    <Wrapper>
      <SEO pageTitle="Shop" />
      <HeaderTwo style_2={true} />
      <ShopBreadcrumb title="Shop Grid" subtitle="Shop Grid" />
      {content}
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default ShopPage;
