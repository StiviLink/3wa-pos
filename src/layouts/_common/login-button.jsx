//@mui
import Button from '@mui/material/Button';
// routes
import RouterLink from '../../routes/components/router-link'
// config
import { PATH_AFTER_LOGIN } from 'src/config-global'

// ----------------------------------------------------------------------
export default function LoginButton({ sx }) {
  return (
    <Button component={RouterLink} href={PATH_AFTER_LOGIN} variant="outlined" sx={{ mr: 1, ...sx }}>
      Login
    </Button>
  );
}
