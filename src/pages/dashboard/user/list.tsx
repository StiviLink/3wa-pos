import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import UserListView from "src/sections/user/view/user-list-view"

// ----------------------------------------------------------------------

export default function UserListPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: User List</title>
            </Helmet>
            <UserListView />
        </HelmetProvider>
    </>
  );
}
