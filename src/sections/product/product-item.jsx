// @mui
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// routes
import { paths } from '../../routes/paths'
import RouterLink from '../../routes/components/router-link'
// utils
import { fCurrency } from '../../utils/format-number'
// redux
import { useDispatch } from '../../redux/store'
import { addToCart } from '../../redux/slice/checkout'
// components
import Image from '../../components/image'
import Iconify from '../../components/iconify'
import ColorPreview from '../../components/color-utils/color-preview'

// ----------------------------------------------------------------------

export default function ProductItem({ product, addCart }) {
  const { id, name, images, price, colors, available, sizes, priceSale } =
    product, coverUrl = images[0]

  const dispatch = useDispatch()

  const linkTo = paths.dashboard.product.details(id)

  const handleAddCart = async () => {
    const newProduct = {
      id,
      name,
      coverUrl,
      available,
      price,
      colors: [colors[0]],
      size: sizes[0],
      quantity: 1,
    }
    try {
      dispatch(addToCart(newProduct))
    } catch (error) {
      console.error(error)
    }
  }

  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
        {addCart ?
            <Fab
                color="warning"
                size="medium"
                className="add-cart-btn"
                onClick={handleAddCart}
                sx={{
                    right: 16,
                    bottom: 16,
                    zIndex: 9,
                    opacity: 0,
                    position: 'absolute',
                    transition: (theme) =>
                        theme.transitions.create('all', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.shorter,
                        }),
                }}
            >
                <Iconify icon="solar:cart-plus-bold" width={24} />
            </Fab>
         : ""}

      <Image alt={name} src={coverUrl} ratio="1/1" sx={{ borderRadius: 1.5 }} />
    </Box>
  )

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link component={RouterLink} href={linkTo} color="inherit" variant="subtitle2" noWrap>
        {name}
      </Link>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <ColorPreview colors={colors} />

        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
          {priceSale && (
            <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {fCurrency(priceSale)}
            </Box>
          )}

          <Box component="span">{fCurrency(price)}</Box>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      {renderImg}

      {renderContent}
    </Card>
  );
}
