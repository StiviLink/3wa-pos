import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import {ProductDetailsView} from '../../../sections/product/view'

// ----------------------------------------------------------------------

export default function ProductDetailsPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: Product Details</title>
            </Helmet>
            <ProductDetailsView />
        </HelmetProvider>
    </>
  );
}
