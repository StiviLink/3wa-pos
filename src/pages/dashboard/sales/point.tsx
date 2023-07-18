import { Helmet, HelmetProvider } from 'react-helmet-async'
// sections
import SalesPointView from "src/sections/sales/view/sales-point-view"

// ----------------------------------------------------------------------

export default function SalesPointPage() {
  return (
    <>
        <HelmetProvider>
            <Helmet>
                <title> Dashboard: Sales Point</title>
            </Helmet>
            <SalesPointView />
        </HelmetProvider>
    </>
  );
}
