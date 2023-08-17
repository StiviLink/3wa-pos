// @mui
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
// components
import Iconify from '../../components/iconify';
import RouterLink from '../../routes/components/router-link';
import CustomPopover from '../../components/custom-popover/custom-popover'
import  usePopover from '../../components/custom-popover/use-popover'

// ----------------------------------------------------------------------

export default function ProductDetailsToolbar({
  publish,
  backLink,
  publishOptions,
  onChangePublish,
  sx,
  ...other
}) {
  const popover = usePopover();

  return (
    <>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{
          mb: { xs: 3, md: 5 },
          ...sx,
        }}
        {...other}
      >
        <Button
          component={RouterLink}
          href={backLink}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        >
          Back
        </Button>

        <Box sx={{ flexGrow: 1 }} />

          {publishOptions && (
              <LoadingButton
                  color="inherit"
                  variant="contained"
                  loading={!publish}
                  loadingIndicator="Loading…"
                  endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                  onClick={popover.onOpen}
                  sx={{ textTransform: 'capitalize' }}
              >
                  {publish}
              </LoadingButton>
          )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 140 }}
      >
        {publishOptions && publishOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === publish}
            onClick={() => {
              popover.onClose();
              onChangePublish(option.value);
            }}
          >
            {option.value === 'published' && <Iconify icon="eva:cloud-upload-fill" />}
            {option.value === 'draft' && <Iconify icon="solar:file-text-bold" />}
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
