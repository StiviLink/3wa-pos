// @mui
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
// components
import Iconify from '../../components/iconify'

// ----------------------------------------------------------------------

export default function OrderDetailsInfo({ user }) {
  const renderCustomer = (
    <>
      <CardHeader
        title="Vendor Info"
      />
      <Stack direction="row" sx={{ p: 3 }}>
        <Avatar
          alt={user.name}
          src={user.image}
          sx={{ width: 48, height: 48, mr: 2 }}
        />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{user.name}</Typography>

          <Box sx={{ color: 'text.secondary' }}>{user.email}</Box>
        </Stack>
      </Stack>
    </>
  )

  const renderPayment = (
    <>
      <CardHeader
        title="Payment"
      />
      <Stack direction="row" alignItems="center" sx={{ p: 3, typography: 'body2' }}>
        <Iconify icon="mdi:cash" width={24} sx={{ ml: 0.5 }} />
          CASH
      </Stack>
    </>
  )

  return (
    <Card>
      {renderCustomer}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderPayment}
    </Card>
  );
}
