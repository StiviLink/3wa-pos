import { useEffect, useCallback, useState } from 'react'
// routes
import { paths } from '../../routes/paths'
import { useRouter } from '../../routes/hook/use-router'
//
import { useAuthContext } from '../hooks/use-auth-context'

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
  auth0: paths.auth.auth0.login,
  amplify: paths.auth.amplify.login,
  firebase: paths.auth.firebase.login,
}

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  // @ts-ignore
  const { authenticated, method } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString()

      const loginPath = loginPaths[method]

      const href = `${loginPath}?${searchParams}`

      router.replace(href);
    }
    else {
      setChecked(true);
    }
  }, [authenticated, method, router])

  useEffect(() => {
    check();
  }, [])

  if (!checked) {
    return null
  }

  return <>{children}</>
}
