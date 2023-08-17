import React, { useEffect, useCallback, useState } from 'react'
// @mui
import { alpha } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'
// _mock
import { PRODUCT_PUBLISH_OPTIONS } from 'src/_mock/_product'
// routes
import { paths } from 'src/routes/paths'
import { useParams } from 'src/routes/hook/use-params'
import RouterLink from 'src/routes/components/router-link'
// components
import Iconify from 'src/components/iconify'
import EmptyContent from 'src/components/empty-content'
import { useSettingsContext } from 'src/components/settings/context/settings-context'
//
import useCheckout from '../hooks/use-checkout'
import useProducts from "../../hook/use-products"
import { ProductDetailsSkeleton } from '../product-skeleton'
import ProductDetailsSummary from '../product-details-summary'
import ProductDetailsToolbar from '../product-details-toolbar'
import ProductDetailsCarousel from '../product-details-carousel'
import ProductDetailsDescription from '../product-details-description'

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ProductDetailsView() {
  const {allProducts} = useProducts()

  const params = useParams()

  const { id } = params

  const productError = undefined, productLoading = undefined

    // eslint-disable-next-line react-hooks/exhaustive-deps
  const product = allProducts.find(x => x.id === id)
    console.info('ProductDetailsView product ', product)

  const settings = useSettingsContext()

  const [currentTab, setCurrentTab] = useState('description')

  const [publish, setPublish] = useState('')

  const { checkout, onAddCart, onGotoStep } = useCheckout()

  useEffect(() => {
    if (product) {
      setPublish(product?.publish);
    }
  }, [])

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const renderSkeleton = <ProductDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${productError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.product.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} sx={undefined} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  )

  const renderProduct = product && (
    <>
      <ProductDetailsToolbar
          backLink={paths.dashboard.product.root}
          publish={publish || ''}
          onChangePublish={handleChangePublish}
          publishOptions={PRODUCT_PUBLISH_OPTIONS} sx={undefined}      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <ProductDetailsSummary
            disabledActions
            product={product}
            cart={checkout.cart}
            onAddCart={onAddCart}
            onGotoStep={onGotoStep}
          />
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ my: 10 }}
      >
      </Box>

      <Card>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            {
              value: 'description',
              label: 'Description'
            }
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

          {currentTab === 'description' && (
              <ProductDetailsDescription description={product?.description}/>
          )}
      </Card>
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {productLoading && renderSkeleton}

      {productError && renderError}

      {product && renderProduct}
    </Container>
  );
}
