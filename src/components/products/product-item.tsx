import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
// internal
import { AddCart, Cart, QuickView, Wishlist } from '@/assets/svg';
import { handleProductModal } from '@/redux/features/productModalSlice';
import { add_cart_product } from '@/redux/features/cartSlice';
import { add_to_wishlist } from '@/redux/features/wishlist-slice';

const ProductItem = ({ product }: any) => {
  const { slug, images, name, price } = product || {};
  const { cart_products } = useSelector((state: any) => state.cart);
  const { wishlist } = useSelector((state: any) => state.wishlist);
  const isAddedToCart = cart_products.some((prd: any) => prd.slug === slug);
  const isAddedToWishlist = wishlist.some((prd: any) => prd.slug === slug);
  const dispatch = useDispatch();

  // handle add product
  const handleAddProduct = (prd: any) => {
    dispatch(add_cart_product(prd));
  };

  console.log('productX', product);
  // handle wishlist product
  const handleWishlistProduct = (prd: any) => {
    dispatch(add_to_wishlist(prd));
  };

  return (
    <div className="tp-product-item-4 p-relative mb-40">
      <div className="tp-product-thumb-4 p-relative fix">
        <Link href={`/products/${slug}`}>
          <Image
            src={images[0].url}
            alt="product img"
            width={284}
            height={352}
          />
        </Link>
        <div className="tp-product-badge">
          {status === 'out-of-stock' && (
            <span className="product-hot">out-stock</span>
          )}
        </div>
        <div className="tp-product-action-3 tp-product-action-4 has-shadow tp-product-action-blackStyle tp-product-action-brownStyle">
          <div className="tp-product-action-item-3 d-flex flex-column">
            {isAddedToCart ? (
              <Link
                href="/cart"
                className={`tp-product-action-btn-3 ${
                  isAddedToCart ? 'active' : ''
                } tp-product-add-cart-btn text-center`}
              >
                <Cart />
                <span className="tp-product-tooltip">View Cart</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => handleAddProduct(product)}
                className={`tp-product-action-btn-3 ${
                  isAddedToCart ? 'active' : ''
                } tp-product-add-cart-btn`}
                disabled={status === 'out-of-stock'}
              >
                <Cart />
                <span className="tp-product-tooltip">Add to Cart</span>
              </button>
            )}
            <button
              type="button"
              className="tp-product-action-btn-3 tp-product-quick-view-btn"
              onClick={() => dispatch(handleProductModal(product))}
            >
              <QuickView />
              <span className="tp-product-tooltip">Quick View</span>
            </button>
            <button
              type="button"
              onClick={() => handleWishlistProduct(product)}
              className={`tp-product-action-btn-3 ${
                isAddedToWishlist ? 'active' : ''
              } tp-product-add-to-wishlist-btn`}
              disabled={status === 'out-of-stock'}
            >
              <Wishlist />
              <span className="tp-product-tooltip">Add To Wishlist</span>
            </button>
          </div>
        </div>
      </div>
      <div className="tp-product-content-4">
        <h3 className="tp-product-title-4">
          <Link href={`/products/${slug}`}>{name}</Link>
        </h3>
        {/* <div className="tp-product-info-4">
          <p>{tags[0]}</p>
        </div> */}

        <div className="tp-product-price-inner-4">
          <div className="tp-product-price-wrapper-4">
            <span className="tp-product-price-4">${price.toFixed(2)}</span>
          </div>
          <div className="tp-product-price-add-to-cart">
            {isAddedToCart ? (
              <Link href="/cart" className="tp-product-add-to-cart-4">
                <AddCart /> View Cart
              </Link>
            ) : (
              <button
                disabled={status === 'out-of-stock'}
                onClick={() => handleAddProduct(product)}
                className="tp-product-add-to-cart-4"
              >
                <AddCart /> Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
