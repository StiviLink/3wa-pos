import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import SalesPaymentView from "src/sections/sales/view/sales-payment-view"

// ----------------------------------------------------------------------

export default function SalesPointPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Sales : Payment </title>
            </Helmet>
            <SalesPaymentView />
        </HelmetProvider>
    </>
  );
}
