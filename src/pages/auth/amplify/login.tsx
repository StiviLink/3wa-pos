import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import { AmplifyLoginView } from 'src/sections/auth/amplify'

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Amplify: Amplify Login</title>
            </Helmet>

            <AmplifyLoginView />
        </HelmetProvider>
    </>
  );
}
