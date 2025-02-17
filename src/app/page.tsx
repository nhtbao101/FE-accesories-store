'use client';

import SEO from '@/components/seo';
import Wrapper from '@/layout/wrapper';
import HeaderFour from '@/layout/headers/header';
import JewelryBanner from '@/components/banner/jewelry-banner';
import JewelryShopBanner from '@/components/shop-banner/jewelry-shop-banner';
// import JewelryAbout from '@/components/about/jewelry-about';
import PopularProducts from '@/components/products/popular-products';
import ProductArea from '@/components/products/product-area';
import JewelryCollectionBanner from '@/components/shop-banner/jewelry-collection-banner';
import BestSellerPrd from '@/components/products/best-seller-prd';
import InstagramAreaFour from '@/components/instagram/instagram-area-4';
import FeatureAreaThree from '@/components/features/feature-area-3';
import FooterTwo from '@/layout/footers/footer-2';
import Header from '@/layout/headers/header';

const Home = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <Header />
      <JewelryBanner />
      <FeatureAreaThree />
      <JewelryShopBanner />
      {/* <JewelryAbout /> */}
      <PopularProducts />
      <ProductArea />
      <JewelryCollectionBanner />
      <BestSellerPrd />
      <InstagramAreaFour />
      <FooterTwo />
    </Wrapper>
  );
};

export default Home;
