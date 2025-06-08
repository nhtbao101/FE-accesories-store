'use client';

import React, { useState, useEffect } from 'react';
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb';
import { useRouter, useSearchParams } from 'next/navigation';

import ErrorMsg from '@/components/common/error-msg';
import ShopFilterOffCanvas from '@/components/common/shop-filter-offcanvas';
import ShopLoader from '@/components/loader/shop/shop-loader';

import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getProducts } from '@/redux/features/product/products.slice';
import ShopArea from '@/app/products/product-area';

const ShopPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useRouter();
  const products: any = useAppSelector((state) => state.products);
  const query = useSearchParams().get('category');

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
  const handleChanges = (val: any) => {
    setCurrPage(1);
    setPriceValue(val);
  };

  // selectHandleFilter
  const selectHandleFilter = (e: any) => {
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
      <ShopBreadcrumb title="Product list" subtitle="Product list" />
      {isLoading ? (
        <ShopLoader loading={isLoading} />
      ) : !error && products?.data?.length === 0 ? (
        <ErrorMsg msg="No Products found!" />
      ) : (
        products.data && (
          <>
            <div className="container">
              <div className="mb-40 d-flex justify-content-end btn-create-prd">
                <a
                  onClick={() => navigation.push('/manage/create-product')}
                  type="button"
                  className="tp-filter-btn"
                >
                  Create product
                </a>
              </div>
            </div>
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
