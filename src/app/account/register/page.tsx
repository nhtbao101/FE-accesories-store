import React from 'react';
import Link from 'next/link';
import LoginShapes from '../components/login-shapes';
import RegisterForm from './register-form';
// internal

const Register = () => {
  return (
    <>
      <section className="tp-login-area pb-140 p-relative z-index-1 fix">
        <LoginShapes />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8">
              <div className="tp-login-wrapper">
                <div className="tp-login-top text-center mb-30">
                  <h3 className="tp-login-title">Sign Up Shofy.</h3>
                  <p>
                    Already have an account?
                    <span>
                      <Link href="/account/login">Sign In</Link>
                    </span>
                  </p>
                </div>
                <div className="tp-login-option">
                  <div className="tp-login-mail text-center mb-40">
                    <p>
                      or Sign up with <a href="#">Email</a>
                    </p>
                  </div>
                  <RegisterForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
