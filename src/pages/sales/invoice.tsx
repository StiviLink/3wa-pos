import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import SalesInvoiceView from "src/sections/sales/view/sales-invoice-view"

// ----------------------------------------------------------------------

export default function SalesPointPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Sales : Invoice </title>
            </Helmet>
            <SalesInvoiceView />
        </HelmetProvider>
    </>
  );
}
