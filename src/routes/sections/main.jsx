import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
// layouts
import SimpleLayout from 'src/layouts/simple'
import CompactLayout from 'src/layouts/compact'
// components
import { SplashScreen } from 'src/components/loading-screen'

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/dashboard/product/shop'))

// PRODUCT
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'))
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'))

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
    ),
    children: [
      {
        path: 'product',
        children: [
          { element: <HomePage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          //{ path: 'checkout', element: <ProductCheckoutPage /> },
        ]
      }
    ]
  },
  {
    element: (
      <SimpleLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </SimpleLayout>
    )
  },
  {
    element: (
      <CompactLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </CompactLayout>
    )
  }
]
