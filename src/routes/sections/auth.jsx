import { lazy, Suspense } from 'react'
// auth
import { GuestGuard } from 'src/auth/guard'
// components
import {LoadingScreen} from 'src/components/loading-screen'

// ----------------------------------------------------------------------

const LoginPage = lazy(() => import('src/pages/auth/login'))

// ----------------------------------------------------------------------


const authLogin = {
  path: 'login',
  element: (
      <GuestGuard>
          <Suspense fallback={<LoadingScreen />}>
              <LoginPage />
          </Suspense>
      </GuestGuard>
  )
}

export const authRoutes = [
  {
    path: 'auth',
    children: [authLogin],
  },
];
