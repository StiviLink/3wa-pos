import { lazy, Suspense } from 'react'
// auth
import { GuestGuard } from 'src/auth/guard'
// components
import { SplashScreen } from 'src/components/loading-screen'

// ----------------------------------------------------------------------

const LoginPage = lazy(() => import('src/pages/auth/login'))

// ----------------------------------------------------------------------


const authLogin = {
  path: 'login',
  element: (
      <GuestGuard>
          <Suspense fallback={<SplashScreen />}>
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
