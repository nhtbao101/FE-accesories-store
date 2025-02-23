import React, { useEffect } from 'react';
import Link from 'next/link';
// internal
import LoginShapes from '../components/login-shapes';
import LoginForm from '../components/login-form';
import { useAppSelector } from '@/lib/hook';
import { useRouter } from 'next/navigation';
import { UserType } from '@/constant';

const AdminLogin = () => {
  const { data } = useAppSelector((state) => state.admin);

  return (
    <>
      <section className="tp-login-area pb-140 p-relative z-index-1 fix">
        <LoginShapes />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="tp-login-wrapper">
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title">Login to Shofy by Admin</h3>
                </div>
                <div className="tp-login-option">
                  <LoginForm userType={UserType.admin} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
