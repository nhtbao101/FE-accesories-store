'use client';

import React from 'react';
import ProductForm from './productForm';
import ShopBreadcrumb from '@/components/breadcrumb/shop-breadcrumb';

const CreateProduct = () => {
  return (
    <div>
      <ShopBreadcrumb title="Create product" subtitle="product" />
      <ProductForm />
    </div>
  );
};

export default CreateProduct;
