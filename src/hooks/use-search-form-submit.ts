'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const useSearchFormSubmit = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (searchText) {
      let route = `/search?searchText=${searchText}`;

      if (category && category !== 'Select Category') {
        route += `&productType=${category}`;
        setCategory('');
      }

      router.push(route, { scroll: false });
      setSearchText('');
    } else {
      router.push(`/`, { scroll: false });
      setSearchText('');
      setCategory('');
    }
  };

  return {
    searchText,
    category,
    setSearchText,
    setCategory,
    handleSubmit
  };
};

export default useSearchFormSubmit;
