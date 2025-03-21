import React, { useEffect } from 'react';
import Link from 'next/link';
// internal
import LoginShapes from '../components/login-shapes';
import LoginForm from '../components/login-form';
import { useAppSelector } from '@/lib/hook';
import { useRouter } from 'next/navigation';
import { UserType } from '@/constant';

const Login = () => {
  const route = useRouter();
  const { data } = useAppSelector((state) => state.user);

  return (
    <>
      <section className="tp-login-area pb-140 p-relative z-index-1 fix">
        <LoginShapes />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="tp-login-wrapper">
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title">Login to Shofy.</h3>
                  <p>
                    Don’t have an account?
                    <span>
                      <Link href="/account/register">
                        Create a free account
                      </Link>
                    </span>
                  </p>
                </div>
                <div className="tp-login-option">
                  <LoginForm userType={UserType.user} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
