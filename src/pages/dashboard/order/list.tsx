import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import { OrderListView } from '../../../sections/order/view'

// ----------------------------------------------------------------------

export default function OrderListPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: Order List</title>
            </Helmet>
            <OrderListView />
        </HelmetProvider>
    </>
  );
}
