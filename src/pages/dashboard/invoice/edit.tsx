import { Helmet, HelmetProvider } from 'react-helmet-async';
// sections
import { InvoiceEditView } from '../../../sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceEditPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: Invoice Edit</title>
            </Helmet>
            <InvoiceEditView />
        </HelmetProvider>
    </>
  );
}
