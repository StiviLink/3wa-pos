// @mui
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'
// hooks
import { useBoolean } from 'src/hooks/use-boolean'
// components
import Label from 'src/components/label'
import Iconify from 'src/components/iconify'
import CustomPopover, { usePopover } from 'src/components/custom-popover'
import ConfirmDialog from 'src/components/custom-dialog'

// ----------------------------------------------------------------------

export default function UserTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow
}) {
  const { name, imageUrl, role, status, email, phone } = row

  const confirm = useBoolean()

  const popover = usePopover()

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={name} src={imageUrl} sx={{ mr: 2 }} />

          <ListItemText
            primary={name}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'banned' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue()
            popover.onClose()
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  )
}
