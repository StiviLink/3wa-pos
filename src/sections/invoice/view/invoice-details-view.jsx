// @mui
import Container from '@mui/material/Container'
// routes
import { paths } from '../../../routes/paths'
// _mock
import { _invoices } from '../../../_mock/_invoice'
// components
import { useParams } from '../../../routes/hook/use-params'
import { useSettingsContext } from '../../../components/settings/context/settings-context'
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs'
//
import InvoiceDetails from '../invoice-details'

// ----------------------------------------------------------------------

export default function InvoiceDetailsView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  //.filter((invoice) => invoice.id === id)
  const currentInvoice = _invoices[0];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={currentInvoice?.invoiceNumber}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Invoice',
            href: paths.dashboard.invoice.root,
          },
          { name: currentInvoice?.invoiceNumber },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InvoiceDetails invoice={currentInvoice} />
    </Container>
  );
}
