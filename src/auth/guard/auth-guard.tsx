import React, { useEffect, useCallback, useState } from 'react'
// routes
import { paths } from '../../routes/paths'
import { useRouter } from '../../routes/hook'
//
import { useAuthContext } from '../hooks/use-auth-context'

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  simple: paths.auth.login
}

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export default function AuthGuard({ children }: Props) {
  const router = useRouter()
  const { authenticated, method } = useAuthContext()

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const searchParams = new URLSearchParams({ returnTo: window.location.pathname }).toString()

      const loginPath = loginPaths[method]

      const href = `${loginPath}?${searchParams}`

      router.replace(href)
    }
    else {
      setChecked(true)
    }
  }, [authenticated, method, router])

  useEffect(() => {
    check()
  }, [check])

  if (!checked) {
    return null
  }

  return <>{children}</>
}
