import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
// internal
import {
  AccountIcon,
  CartTwo,
  Menu,
  Search,
  User,
  Wishlist
} from '@/assets/svg';
import Menus from './header-com/menus';
import logo_white from '@assets/img/logo/logo-white.svg';
import logo_dark from '@assets/img/logo/logo.svg';
import useSticky from '@/hooks/use-sticky';
import SearchBar from './header-com/search-bar';
import OffCanvas from '@/components/common/off-canvas';
import useCartInfo from '@/hooks/use-cart-info';
import CartMiniSidebar from '@/components/common/cart-mini-sidebar';
import { openCartMini } from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { useRouter } from 'next/navigation';

// setting
function ProfileSetting({ active, handleActive }) {
  const { data } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // handle logout
  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push('/');
  };
  return (
    <div className="tp-header-top-menu-item tp-header-setting">
      <span
        onClick={() => handleActive('setting')}
        className="tp-header-setting-toggle"
        id="tp-header-setting-toggle"
      >
        Setting
      </span>
      <ul className={active === 'setting' ? 'tp-setting-list-open' : ''}>
        <li>
          <Link href="/profile">My Profile</Link>
        </li>
        <li>
          <Link href="/wishlist">Wishlist</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>
        </li>
        <li>
          {!data?.name && (
            <Link href="/login" className="cursor-pointer">
              Login
            </Link>
          )}
          {data?.name && (
            <a onClick={handleLogout} className="cursor-pointer">
              Logout
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}

const Header = () => {
  const { data: userInfo } = useAppSelector((state) => state.user);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffCanvasOpen, setIsCanvasOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  const dispatch = useDispatch();

  console.log('userInfo', userInfo);

  const accountMenu = [
    {
      label: 'Account',
      url: '/account'
    },
    {
      label: 'Logout',
      url: '/account'
    }
  ];
  return (
    <>
      <header>
        <div
          id="header-sticky"
          className={`tp-header-area tp-header-style-transparent-white tp-header-sticky tp-header-transparent has-dark-logo tp-header-height ${
            sticky ? 'header-sticky' : ''
          }`}
        >
          <div className="tp-header-bottom-3 pl-85 pr-85">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-2 col-6">
                  <div className="logo">
                    <Link href="/">
                      <Image
                        className="logo-light"
                        src={logo_white}
                        alt="logo"
                      />
                      <Image className="logo-dark" src={logo_dark} alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-8 d-none d-lg-block">
                  <div className="main-menu menu-style-3 menu-style-4 p-relative">
                    <nav className="tp-main-menu-content">
                      <Menus />
                    </nav>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-2 col-6">
                  <div className="tp-header-action d-flex align-items-center justify-content-end ml-50">
                    <div className="tp-header-action-item d-none d-sm-block">
                      <button
                        onClick={() => setIsSearchOpen(true)}
                        type="button"
                        className="tp-header-action-btn tp-search-open-btn"
                      >
                        <Search />
                      </button>
                    </div>
                    <div className="tp-header-action-item d-none d-sm-block">
                      <Link href="/wishlist" className="tp-header-action-btn">
                        <Wishlist />
                        <span className="tp-header-action-badge">
                          {wishlist.length}
                        </span>
                      </Link>
                    </div>
                    <div className="tp-header-action-item d-none d-sm-block">
                      <button
                        onClick={() => dispatch(openCartMini())}
                        type="button"
                        className="tp-header-action-btn cartmini-open-btn"
                      >
                        <CartTwo />
                        <span className="tp-header-action-badge">
                          {quantity}
                        </span>
                      </button>
                    </div>
                    <div className="tp-header-login tp-header-action-item d-none d-lg-block">
                      <div className="d-flex align-items-center tp-header-action-btn">
                        {!userInfo ? (
                          <Link href="/account/login">
                            <div className="tp-header-login-icon">
                              <span className="d-flex">
                                <AccountIcon />
                                <div className="tp-header-login-title">
                                  Sign In
                                </div>
                              </span>
                            </div>
                          </Link>
                        ) : (
                          <>
                            {/* <li className="has-dropdown">
                              <ul className="tp-submenu">
                                {accountMenu.map((subMenu, i) => (
                                  <li key={i}>
                                    <Link href={subMenu.url}>
                                      {subMenu.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li> */}
                            <div className="tp-header-login-content d-none d-xl-block">
                              <Link
                                href="/account"
                                className="d-flex has-dropdown"
                              >
                                <AccountIcon />
                                {userInfo?.fullName && (
                                  <span>Hello {userInfo?.fullName}</span>
                                )}
                                {/* <li className="has-dropdown"> */}
                                <ul className="tp-submenu">
                                  {accountMenu.map((subMenu, i) => (
                                    <li key={i}>
                                      <Link href={subMenu.url}>
                                        {subMenu.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                                {/* </li> */}
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="tp-header-action-item d-lg-none">
                      <button
                        onClick={() => setIsCanvasOpen(true)}
                        type="button"
                        className="tp-offcanvas-open-btn"
                      >
                        <Menu />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* search bar start */}
      <SearchBar
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      {/* search bar end */}

      {/* cart mini sidebar start */}
      <CartMiniSidebar />
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <OffCanvas
        isOffCanvasOpen={isOffCanvasOpen}
        setIsCanvasOpen={setIsCanvasOpen}
        categoryType="jewelry"
      />
      {/* off canvas end */}
    </>
  );
};

export default Header;
