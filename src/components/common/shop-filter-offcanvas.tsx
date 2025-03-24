import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  handleFilterSidebarClose,
  handleFilterSidebarOpen
} from '@/redux/features/shop-filter-slice';
import CategoryFilter from '@/app/products/product-filter/category-filter';
// import PriceFilter from '@/app/collections/collection-filter/price-filter';
// import StatusFilter from '@/app/collections/collection-filter/status-filter';
// import ColorFilter from '@/app/collections/collection-filter/color-filter';
import TopRatedProducts from '@/app/products/product-filter/top-rated-products';
// import ProductBrand from '@/app/collections/collection-filter/product-brand';
import ResetButton from '@/app/products/product-filter/reset-button';

const ShopFilterOffCanvas = ({
  all_products,
  otherProps,
  right_side = false
}: any) => {
  const { setCurrPage } = otherProps;
  const { filterSidebar } = useSelector((state: any) => state.shopFilter);
  const dispatch = useDispatch();

  // max price
  // const maxPrice = all_products.reduce((max, product) => {
  //   return product.price > max ? product.price : max;
  // }, 0);

  return (
    <>
      <div
        className={`tp-filter-offcanvas-area ${
          filterSidebar ? 'offcanvas-opened' : ''
        }`}
      >
        <div className="tp-filter-offcanvas-wrapper">
          <div className="tp-filter-offcanvas-close">
            <button
              type="button"
              onClick={() => dispatch(handleFilterSidebarOpen(null))}
              className="tp-filter-offcanvas-close-btn filter-close-btn"
            >
              <i className="fa-solid fa-xmark"></i> Close
            </button>
          </div>
          <div className="tp-shop-sidebar">
            {/* filter */}
            {/* <PriceFilter
              priceFilterValues={priceFilterValues}
              maxPrice={maxPrice}
            /> */}
            {/* status */}
            {/* <StatusFilter setCurrPage={setCurrPage} shop_right={right_side} /> */}
            {/* categories */}
            <CategoryFilter setCurrPage={setCurrPage} shop_right={right_side} />
            {/* color */}
            {/* <ColorFilter setCurrPage={setCurrPage} shop_right={right_side} /> */}
            {/* product rating */}
            {/* <TopRatedProducts /> */}
            {/* brand */}
            {/* <ProductBrand setCurrPage={setCurrPage} shop_right={right_side} /> */}
            {/* reset filter */}
            {/* <ResetButton shop_right={right_side} /> */}
          </div>
        </div>
      </div>

      {/* overlay start */}
      <div
        onClick={() => dispatch(handleFilterSidebarClose(null))}
        className={`body-overlay ${filterSidebar ? 'opened' : ''}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default ShopFilterOffCanvas;
