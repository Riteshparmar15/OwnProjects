import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MenuDrawer } from './MenuDrawer';
import { CartDrawer } from './CartDrawer';
import { SearchOverlay } from './SearchOverlay';
import { FloatingCTAs } from './FloatingCTAs';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <>
      <div className="grain" aria-hidden />
      <ScrollToTop />
      <Header />
      <MenuDrawer />
      <CartDrawer />
      <SearchOverlay />
      <FloatingCTAs />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
