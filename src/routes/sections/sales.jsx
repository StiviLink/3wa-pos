import { lazy, Suspense } from 'react'
import {Outlet} from "react-router-dom"
// auth
import { AuthGuard } from 'src/auth/guard'
// components
import {LoadingScreen} from 'src/components/loading-screen'

// ----------------------------------------------------------------------

const SalesPaymentPage = lazy(() => import('src/pages/sales/payment'))
const SalesInvoicePage = lazy(() => import('src/pages/sales/invoice'))

// ----------------------------------------------------------------------


const salesPayment = {
    path: 'payment',
    index: true,
    element: <SalesPaymentPage />
}

const salesInvoice = {
  path: 'invoice',
  element: <SalesInvoicePage />
}

export const salesRoutes = [
  {
    path: 'sales',
    element: (
        <AuthGuard>
            <Suspense fallback={<LoadingScreen/>}>
                <Outlet />
            </Suspense>
        </AuthGuard>
    ),
    children: [salesPayment, salesInvoice],
  },
];
