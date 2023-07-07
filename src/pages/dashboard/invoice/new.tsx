import { Helmet, HelmetProvider } from 'react-helmet-async';
// sections
import { InvoiceCreateView } from '../../../sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceCreatePage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: Create a new invoice</title>
            </Helmet>
            <InvoiceCreateView />
        </HelmetProvider>
    </>
  );
}
