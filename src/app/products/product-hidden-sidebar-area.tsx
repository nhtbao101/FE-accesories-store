import React, { useState } from 'react';
import Pagination from '@/ui/Pagination';

// import ProductItem from '@/components/products/fashion/product-item';
import ShopListItem from './product-list-item';
import CollectionTopLeft from './product-top-left';
import ShopTopRight from './product-top-right';
import ProductItem from './product-item';

const ShopHiddenSidebarArea = ({ all_products, products, otherProps }: any) => {
  const { currPage, setCurrPage, selectHandleFilter } = otherProps;
  const [filteredRows, setFilteredRows] = useState(products);
  const [pageStart, setPageStart] = useState(0);
  const [countOfPage, setCountOfPage] = useState(12);

  const paginatedData = (items: any, startPage: any, pageCount: any) => {
    setFilteredRows(items);
    setPageStart(startPage);
    setCountOfPage(pageCount);
  };

  return (
    <>
      <section className="tp-shop-area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-12 col-lg-12">
              <div className="tp-shop-main-wrapper">
                <div className="tp-shop-top mb-45">
                  <div className="row">
                    <div className="col-xl-6">
                      <CollectionTopLeft
                        showing={
                          products.length === 0
                            ? 0
                            : filteredRows.length &&
                              filteredRows.slice(
                                pageStart,
                                pageStart + countOfPage
                              ).length
                        }
                        total={all_products.length}
                      />
                    </div>
                    <div className="col-xl-6">
                      <ShopTopRight selectHandleFilter={selectHandleFilter} />
                    </div>
                  </div>
                </div>
                {products.length === 0 && <h2>No products found</h2>}
                {products.length > 0 && (
                  <div className="tp-shop-items-wrapper tp-shop-item-primary">
                    <div className="tab-content" id="productTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="grid-tab-pane"
                        role="tabpanel"
                        aria-labelledby="grid-tab"
                        tabIndex={0}
                      >
                        <div className="row">
                          {filteredRows.length &&
                            filteredRows
                              .slice(pageStart, pageStart + countOfPage)
                              .map((item: any, index: number) => (
                                <div
                                  key={index}
                                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                >
                                  <ProductItem product={item} />
                                </div>
                              ))}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="list-tab-pane"
                        role="tabpanel"
                        aria-labelledby="list-tab"
                        tabIndex={0}
                      >
                        <div className="tp-shop-list-wrapper tp-shop-item-primary mb-70">
                          <div className="row">
                            <div className="col-xl-12">
                              {filteredRows.length &&
                                filteredRows
                                  .slice(pageStart, pageStart + countOfPage)
                                  .map((item: any) => (
                                    <ShopListItem
                                      key={item._id}
                                      product={item}
                                    />
                                  ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {products.length > 0 && (
                  <div className="tp-shop-pagination mt-20">
                    <div className="tp-pagination">
                      <Pagination
                        items={products}
                        countOfPage={12}
                        paginatedData={paginatedData}
                        currPage={currPage}
                        setCurrPage={setCurrPage}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopHiddenSidebarArea;
