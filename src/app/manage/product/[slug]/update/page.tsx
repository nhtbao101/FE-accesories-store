'use client';

import React, { useEffect } from 'react';
import ProductForm from '../../../../../components/products/productForm';
import ShopBreadcrumb from '../../../../../components/breadcrumb/shop-breadcrumb';
import { useAppDispatch, useAppSelector } from '@/lib/hook';

import { useParams } from 'next/navigation';
import { getProduct } from '@/redux/features/product/product.slice';
import ProductFormSkeleton from './Skeleton';

const UpdateProduct = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  // example URL /posts/123
  const { slug }: any = params;
  const { isLoading, isSuccess, error, data }: any = useAppSelector(
    (state) => state.product.detail
  );

  useEffect(() => {
    // console.log('data', data);
    // if (!data && slug) {
    dispatch(getProduct(slug));
    // }
  }, []);

  console.log(
    'Update page',
    useAppSelector((state) => state.product)
  );

  console.log('isSuccess', isSuccess);

  return (
    <>
      <div>
        <ShopBreadcrumb title="Update product" subtitle="product" />
        {isSuccess ? (
          <ProductForm isUpdate data={data} />
        ) : (
          <ProductFormSkeleton loading={isLoading} />
        )}
      </div>
    </>
  );
};

export default UpdateProduct;
