import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import LoginView from "../../sections/auth/login"

// ----------------------------------------------------------------------

export default function LoginPage() {
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
