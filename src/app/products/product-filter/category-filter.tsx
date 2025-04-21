import React, { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// internal
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getCategory } from '@/redux/features/category/category.slice';
import CategorySkeleton from '@/components/skeleton/categoryFilter';

const CategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, error, data }: any = useAppSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (!data) {
      dispatch(getCategory());
    }
  }, []);

  const handleCategoryRoute = useCallback(
    (categoryId?: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (categoryId) {
        params.set('categoryId', categoryId.toString());
        router.push(`/products?${params.toString()}`);
      } else {
        params.delete('categoryId');
        router.push(`/products?${params.toString()}`);
      }
    },
    [searchParams]
  );

  return (
    <>
      {isLoading ? (
        <CategorySkeleton loading={isLoading} />
      ) : (
        <div className="tp-shop-widget mb-50">
          <h3 className="tp-shop-widget-title">Categories</h3>
          <div className="tp-shop-widget-content">
            <div className="tp-shop-widget-categories">
              <ul>
                <li>
                  <a
                    onClick={() => handleCategoryRoute()}
                    style={{ cursor: 'pointer' }}
                    className={!searchParams.get('categoryId') ? 'active' : ''}
                  >
                    All
                  </a>
                </li>
                {data?.map((item: any, index: number) => (
                  <li key={index}>
                    <a
                      onClick={() => handleCategoryRoute(item.id)}
                      style={{ cursor: 'pointer' }}
                      className={
                        searchParams.get('categoryId') === item.id.toString()
                          ? 'active'
                          : ''
                      }
                    >
                      {item.name} <span>{item.products?.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryFilter;
