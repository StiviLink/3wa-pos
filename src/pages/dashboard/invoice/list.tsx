import { Helmet, HelmetProvider } from 'react-helmet-async';
// sections
import { InvoiceListView } from '../../../sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceListPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: Invoice List</title>
            </Helmet>
            <InvoiceListView />
        </HelmetProvider>
    </>
  );
}
