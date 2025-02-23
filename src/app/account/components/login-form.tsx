import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// internal
import { CloseEye, OpenEye } from '@/assets/svg';
import ErrorMsg from '../../../components/common/error-msg';
import { notifyError, notifySuccess } from '@/utils/toast';
import { Login } from '@/core/types/user';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { clearUserState, userLogin } from '@/redux/features/user.slice';
import { setLS } from '@/core/helpers/storageHelper';
import { UserType } from '@/constant';
import { adminLogin, clearAdminState } from '@/redux/features/admin.slice';

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password')
});

type Props = {
  userType: UserType;
};

const LoginForm = (props: Props) => {
  const { userType } = props;
  const { isLoading, isSuccess, error, data, token } = useAppSelector(
    (state) => state.user
  );

  const {
    isLoading: isLoadingAdmin,
    isSuccess: isLoginAdminSuccess,
    error: errorLoginAdmin,
    data: adminData,
    token: adminToken
  } = useAppSelector((state) => state.admin);

  const [showPass, setShowPass] = useState(false);
  const dispatch = useAppDispatch();
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
  // onSubmit
  const onSubmit = (data: Login) => {
    dispatch(userType === UserType.admin ? adminLogin(data) : userLogin(data));
  };

  useEffect(() => {
    console.log('userType', userType);
    if (userType === UserType.user) {
      if (isSuccess && data) {
        setLS('userInfo', data);
        setLS('token', token);
        notifySuccess('Login successfully');
        reset();
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    } else {
      console.log(
        'isLoginAdminSuccess && adminData',
        isLoginAdminSuccess,
        adminData
      );
      if (isLoginAdminSuccess && adminData) {
        setLS('adminInfo', data);
        setLS('token', adminToken);
        notifySuccess('Login successfully');
        setTimeout(() => {
          reset();
          router.push('/manage');
        }, 1000);
      }
    }
  }, [isSuccess, isLoginAdminSuccess, data, adminData, token, userType]);

  useEffect(() => {
    if (!isLoading && error) {
      notifyError(error);
    }
    if (!isLoadingAdmin && errorLoginAdmin) {
      notifyError(errorLoginAdmin);
    }
  }, [error, errorLoginAdmin, isLoading, isLoadingAdmin]);

  useEffect(() => {
    () => clearUserState();
    () => clearAdminState();
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register('email', { required: `Email is required!` })}
              name="email"
              id="email"
              type="email"
              placeholder="example@mail.com"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register('password', { required: `Password is required!` })}
                id="password"
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
          <input id="remeber" type="checkbox" />
          <label htmlFor="remeber">Remember me</label>
        </div>
        <div className="tp-login-forgot">
          <Link href="/forgot">Forgot Password?</Link>
        </div>
      </div>
      <div className="tp-login-bottom">
        <button type="submit" className="tp-login-btn w-100">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
