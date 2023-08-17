import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import LoginView from "src/sections/auth/login"

// ----------------------------------------------------------------------

export default function LoginPage() {
    console.log('In Login')
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title>Login</title>
            </Helmet>

            <LoginView />
        </HelmetProvider>
    </>
  );
}
