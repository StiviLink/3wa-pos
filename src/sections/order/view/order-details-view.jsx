// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// routes
import { paths } from 'src/routes/paths'
// components
import { useParams } from '../../../routes/hook/use-params';
import { useSettingsContext } from '../../../components/settings/context/settings-context';
//
import OrderDetailsInfo from '../order-details-info'
import OrderDetailsItems from '../order-details-item'
import OrderDetailsToolbar from '../order-details-toolbar'
import useOrders from "../../hook/use-orders";

// ----------------------------------------------------------------------

export default function OrderDetailsView() {
  const settings = useSettingsContext()

  const {allOrders} = useOrders()

  const params = useParams()

  const { id } = params

  const currentOrder = allOrders.find(x => id === x.id)

  console.info('currentOrder', currentOrder)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <OrderDetailsToolbar
        backLink={paths.dashboard.order.root}
        orderNumber={currentOrder.orderNumber}
        createdAt={currentOrder.createdAt}
      />

      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <OrderDetailsItems
              items={currentOrder.items}
              taxes={currentOrder.taxes??0}
              subTotal={currentOrder.subTotal}
              totalAmount={currentOrder.subTotal}
            />
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <OrderDetailsInfo
            user={currentOrder.user}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
