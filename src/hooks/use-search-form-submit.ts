'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const useSearchFormSubmit = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams.toString());

  const [productName, setProductName] = useState(
    params.get('productName') || ''
  );
  const [categoryId, setCategoryId] = useState(params.get('categoryId') || '');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (productName) {
      params.set('productName', productName);
      router.push(`products?${params.toString()}`, { scroll: false });
    } else {
      params.delete('productName');
      router.push(`products?${params.toString()}`, {
        scroll: false
      });
    }
  };

  return {
    productName,
    categoryId,
    setProductName,
    setCategoryId,
    handleSubmit
  };
};

export default useSearchFormSubmit;
