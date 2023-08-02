import { lazy, Suspense } from 'react'
// auth
import { AuthGuard } from 'src/auth/guard'
// components
import { SplashScreen } from 'src/components/loading-screen'

// ----------------------------------------------------------------------

const SalesPaymentPage = lazy(() => import('src/pages/sales/payment'))
const SalesInvoicePage = lazy(() => import('src/pages/sales/invoice'))

// ----------------------------------------------------------------------


const salesPayment = {
  path: 'payment',
  element: (
      <AuthGuard>
          <Suspense fallback={<SplashScreen />}>
              <SalesPaymentPage />
          </Suspense>
      </AuthGuard>
  )
}

const salesInvoice = {
  path: 'invoice',
  element: (
      <AuthGuard>
          <Suspense fallback={<SplashScreen />}>
              <SalesInvoicePage />
          </Suspense>
      </AuthGuard>
  )
}

export const salesRoutes = [
  {
    path: 'sales',
    children: [salesPayment, salesInvoice],
  },
];
