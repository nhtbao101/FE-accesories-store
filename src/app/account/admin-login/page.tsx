'use client';

import React from 'react';
import SEO from '@/components/seo';
import HeaderTwo from '@/layout/headers/header-2';
import Footer from '@/layout/footers/footer';
import Wrapper from '@/layout/wrapper';
import CommonBreadcrumb from '@/components/breadcrumb/common-breadcrumb';
import Login from './login';

const LoginPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Login" />
      <HeaderTwo style_2={true} />
      <CommonBreadcrumb title="Login" subtitle="Login" center={true} />
      <Login />
      <Footer primary_style={true} />
    </Wrapper>
  );
};

export default LoginPage;
