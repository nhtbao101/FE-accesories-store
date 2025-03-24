import React from 'react';
import Loader from '@/components/loader/loader';

const SingleLoader = ({
  loading,
  width
}: {
  loading: boolean;
  width: string;
}) => {
  return (
    <div style={{ height: `${width}px` }}>
      <Loader loading={loading} />
    </div>
  );
};

export default SingleLoader;
