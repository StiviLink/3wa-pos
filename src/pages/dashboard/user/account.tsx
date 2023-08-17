import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import AccountView from "src/sections/account/view/user-account-view"

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: User Account</title>
            </Helmet>
            <AccountView />
        </HelmetProvider>
    </>
  )
}
