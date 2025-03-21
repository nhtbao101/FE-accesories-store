import SingleLoader from '@/components/loading';
import React from 'react';

const ProductFormSkeleton = ({ loading = false }) => {
  return (
    <section className="tp-shop-area">
      <div className="container">
        <div className="col-xl-3 col-lg-4 ml-170">
          <SingleLoader loading={loading} width="80" />
          <SingleLoader loading={loading} width="100" />
          <SingleLoader loading={loading} width="80" />
          <SingleLoader loading={loading} width="80" />
          <SingleLoader loading={loading} width="80" />
          <SingleLoader loading={loading} width="80" />
        </div>
      </div>
    </section>
  );
};

export default ProductFormSkeleton;
