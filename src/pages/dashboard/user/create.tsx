import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import UserCreateView from "src/sections/user/view/user-create-view"

// ----------------------------------------------------------------------

export default function UserCreatePage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: User Create</title>
            </Helmet>
            <UserCreateView />
        </HelmetProvider>
    </>
  );
}
