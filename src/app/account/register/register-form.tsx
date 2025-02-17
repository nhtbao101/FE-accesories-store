'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
// internal
import { CloseEye, OpenEye } from '@/assets/svg';
import ErrorMsg from '../../../components/common/error-msg';
import { notifyError, notifySuccess } from '@/utils/toast';
import { useRegisterUserMutation } from '@/redux/features/auth/authApi';
import { Register } from '@/core/types/user';

// schema
const schema = Yup.object().shape({
  fullName: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  // address: Yup.string().label('Address'),
  // phoneNumber: Yup.string().required().min(10).max(11).label('Phone Number'),
  // avatar: Yup.string().label('Avatar'),
  remember: Yup.bool()
    .oneOf([true], 'You must agree to the terms and conditions to proceed.')
    .label('Terms and Conditions')
});

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [registerUser, {}] = useRegisterUserMutation();
  const router = useRouter();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });
  // on submit
  const onSubmit = (data: Register) => {
    registerUser({
      name: data.fullName,
      email: data.email,
      password: data.password
      // phoneNumber: data.phoneNumber,
      // address: data.address,
      // avatar: data.avatar
    }).then((result) => {
      if (result?.error) {
        notifyError('Register Failed');
      } else {
        notifySuccess(result?.data?.message);
        router.push('/');
      }
    });
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register('fullName', { required: `Name is required!` })}
              id="name"
              name="name"
              type="text"
              placeholder="Antony Villa"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">Your Name</label>
          </div>
          <ErrorMsg msg={errors.fullName?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register('email', { required: `Email is required!` })}
              id="email"
              name="email"
              type="email"
              placeholder="accesories-store@gmail.com"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        {/* <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register('phoneNumber', {
                required: 'Phone Number is required!'
              })}
              id="phoneNumber"
              name="phoneNumber"
              type="number"
              placeholder="0939939093"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Phone Number</label>
          </div>
          <ErrorMsg msg={errors.phoneNumber?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register('address', { required: 'Address is required' })}
              id="address"
              name="address"
              type="text"
              placeholder="23 An Nhon 11, Da Nang"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="name">Address</label>
          </div>
          <ErrorMsg msg={errors.address?.message} />
        </div> */}
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register('password', { required: `Password is required!` })}
                id="password"
                name="password"
                type={showPass ? 'text' : 'password'}
                placeholder="Min. 6 character"
              />
            </div>
            <div className="tp-login-input-eye" id="password-show-toggle">
              <span className="open-eye" onClick={() => setShowPass(!showPass)}>
                {showPass ? <CloseEye /> : <OpenEye />}
              </span>
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <ErrorMsg msg={errors.password?.message} />
        </div>
      </div>
      <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
        <div className="tp-login-remeber">
          <input
            {...register('remember', {
              required: `Terms and Conditions is required!`
            })}
            id="remember"
            name="remember"
            type="checkbox"
          />
          <label htmlFor="remember">
            I accept the terms of the Service & <a href="#">Privacy Policy</a>.
          </label>
          <ErrorMsg msg={errors.remember?.message} />
        </div>
      </div>
      <div className="tp-login-bottom">
        <button type="submit" className="tp-login-btn w-100">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
