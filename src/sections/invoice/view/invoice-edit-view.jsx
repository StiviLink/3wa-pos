// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from '../../../routes/paths';
import { useParams } from '../../../routes/hook/use-params';
// _mock
import { _invoices } from '../../../_mock/_invoice';
// components
import { useSettingsContext } from '../../../components/settings/context/settings-context';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
//
import InvoiceNewEditForm from '../invoice-new-edit-form';

// ----------------------------------------------------------------------

export default function InvoiceEditView() {
  const settings = useSettingsContext();

  const params = useParams();

  const { id } = params;

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
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
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <InvoiceNewEditForm currentInvoice={currentInvoice} />
    </Container>
  );
}
