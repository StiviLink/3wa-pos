import {Navigate, Outlet, useRoutes} from 'react-router-dom'
import {lazy, Suspense} from "react"
// layouts
import DashboardLayout from "../../layouts/dashboard"
// routes
import { dashboardRoutes } from './dashboard'
import {authRoutes} from "./auth"
//components
import {LoadingScreen} from "../../components/loading-screen"
//auth
import {AuthGuard} from "../../auth/guard"

const ProductShopPage = lazy(() => import('src/pages/dashboard/product/shop'))

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: (
          <AuthGuard>
              <DashboardLayout>
                  <Suspense fallback={<LoadingScreen />}>
                      <ProductShopPage />
                      <Outlet />
                  </Suspense>
              </DashboardLayout>
          </AuthGuard>
      ),
    },
      //Auth Routes
      ...authRoutes,
      // Dashboard routes
      ...dashboardRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ])
}
