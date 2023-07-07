import { Helmet, HelmetProvider } from 'react-helmet-async';
// sections
import { OrderDetailsView } from '../../../sections/order/view';

// ----------------------------------------------------------------------

export default function OrderDetailsPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: Order Details</title>
            </Helmet>
            <OrderDetailsView />
        </HelmetProvider>
    </>
  );
}
