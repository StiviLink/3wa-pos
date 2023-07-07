import { Helmet, HelmetProvider } from 'react-helmet-async';
// sections
import { InvoiceDetailsView } from '../../../sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceDetailsPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: Invoice Details</title>
            </Helmet>
            <InvoiceDetailsView />
        </HelmetProvider>
    </>
  );
}
