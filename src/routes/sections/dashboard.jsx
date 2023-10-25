import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
//auth
import {AuthGuard} from "../../auth/guard"
// layouts
import DashboardLayout from 'src/layouts/dashboard'
// components
import { LoadingScreen } from 'src/components/loading-screen'
import {getUserByEmail} from "../../api/user"

// ----------------------------------------------------------------------
// SALES
const SalesPointPage = lazy(() => import('src/pages/dashboard/sales/point'))
// USER
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'))
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/create'))
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'))
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'))
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'))
const ProductShopPage = lazy(() => import('src/pages/dashboard/product/shop'))
// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'))
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'))


const currentUser = sessionStorage.getItem('currentUser'),
    user = currentUser ? await getUserByEmail(JSON.parse(currentUser)?.email) : {}

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
        <AuthGuard>
          <DashboardLayout>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </AuthGuard>
    ),
    children: [
      { element: <ProductShopPage />, index: true },
      {
        path: 'sales',
        children: [
          { element: <SalesPointPage />, index: true },
          { path: 'point', element: <SalesPointPage /> }
        ],
      },
      {
        path: 'user',
        children: [
          { element: <UserAccountPage />, index: true },
          user?.role==="Admin" ? { path: 'list', element: <UserListPage /> } : "",
          user?.role==="Admin" ? { path: 'new', element: <UserCreatePage /> } : "",
          { path: 'account', element: <UserAccountPage /> }
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'shop', element: <ProductShopPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      }
    ],
  },
];
