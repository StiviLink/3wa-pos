import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
//auth
import {AuthGuard} from "../../auth/guard"
// layouts
import DashboardLayout from 'src/layouts/dashboard'
// components
import { LoadingScreen } from 'src/components/loading-screen'

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
// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'))
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'))
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'))
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'))


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
          { element: <UserListPage />, index: true },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
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
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      }
    ],
  },
];
