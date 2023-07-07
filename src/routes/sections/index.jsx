import {Navigate, Outlet, useRoutes} from 'react-router-dom'
// layouts
import DashboardLayout from "../../layouts/dashboard"
// routes
import { dashboardRoutes } from './dashboard'
import {lazy, Suspense} from "react";
import {LoadingScreen} from "../../components/loading-screen";

const ProductShopPage = lazy(() => import('src/pages/dashboard/product/shop'))

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: (
          <DashboardLayout>
            <Suspense fallback={<LoadingScreen />}>
              <ProductShopPage />
              <Outlet />
            </Suspense>
          </DashboardLayout>
      ),
    },

    // Dashboard routes
    ...dashboardRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ])
}
