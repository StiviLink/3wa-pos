import { useCallback, useEffect } from 'react'
// routes
import { paths } from '../../routes/paths'
import { useRouter } from 'src/routes/hook/use-router'
//
import { useAuthContext } from '../hooks/use-auth-context'

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  // @ts-ignore
  const { authenticated } = useAuthContext()

  const check = useCallback(() => {
    if (authenticated) {
      router.replace(paths.dashboard.root)
    }
  }, [authenticated, router])

  useEffect(() => {
    check();
  }, [check])

  return <>{children}</>
}
