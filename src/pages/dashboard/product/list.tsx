import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import {ProductListView} from '../../../sections/product/view'

// ----------------------------------------------------------------------

export default function ProductListPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: Product List</title>
            </Helmet>
            <ProductListView />
        </HelmetProvider>
    </>
  );
}
