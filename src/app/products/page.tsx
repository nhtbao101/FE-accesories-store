'use client';

import React, { useState, useEffect } from 'react';
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb';

import ShopFilterOffCanvas from '@/components/common/shop-filter-offcanvas';
import ShopLoader from '@/components/loader/shop/shop-loader';
import ShopArea from './product-area';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getProducts } from '@/redux/features/product/products.slice';
import { useSearchParams } from 'next/navigation';

const ShopPage = () => {
  const dispatch = useAppDispatch();
  const categoryId = useSearchParams().get('categoryId');
  const productName = useSearchParams().get('productName');
  const products: any = useAppSelector((state) => state.products);

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
    dispatch(
      getProducts({
        categoryId: categoryId || '',
        productName: productName || ''
      })
    );
  }, [categoryId, productName || '']);

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
      ) : (
        // : !error && products?.data?.length === 0 ? (
        //   // <ErrorMsg msg="No Products found!" />
        //   <div>
        //     <Image src={CakeEmpty} alt="sold out" />
        //   </div>
        //   )
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
