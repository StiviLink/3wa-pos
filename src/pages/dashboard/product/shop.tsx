import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import {ProductShopView} from '../../../sections/product/view'

// ----------------------------------------------------------------------

export default function ProductShopPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: Product Shop</title>
            </Helmet>
            <ProductShopView />
        </HelmetProvider>
    </>
  );
}
