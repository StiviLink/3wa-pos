import React, { useEffect, useCallback, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// _mock
import { PRODUCT_PUBLISH_OPTIONS } from '../../../_mock/_product';
// routes
import { paths } from '../../../routes/paths';
import { useParams } from '../../../routes/hook/use-params';
import RouterLink from '../../../routes/components/router-link';
// components
import Iconify from '../../../components/iconify';
import EmptyContent from '../../../components/empty-content';
import { useSettingsContext } from '../../../components/settings/context/settings-context';
//
import useCheckout from '../../hooks/use-checkout';
import { ProductDetailsSkeleton } from '../product-skeleton';
import ProductDetailsReview from '../product-details-review';
import ProductDetailsSummary from '../product-details-summary';
import ProductDetailsToolbar from '../product-details-toolbar';
import ProductDetailsCarousel from '../product-details-carousel';
import ProductDetailsDescription from '../product-details-description';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halve.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

export default function ProductDetailsView() {
  const params = useParams();

  const { id } = params;

  const productError = undefined, productLoading = undefined

    // eslint-disable-next-line react-hooks/exhaustive-deps
  const product = {
      "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
      "gender": "Men",
      "publish": "published",
      "category": "Shoes",
      "available": 72,
      "priceSale": null,
      "taxes": 10,
      "quantity": 80,
      "sizes": [
          "6",
          "7",
          "8",
          "8.5",
          "9",
          "9.5",
          "10",
          "10.5",
          "11",
          "11.5",
          "12",
          "13"
      ],
      "inventoryType": "in stock",
      "images": [
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg",
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg",
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg",
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg",
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_5.jpg",
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg",
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg",
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg"
      ],
      "ratings": [
          {
              "name": "1 Star",
              "starCount": 9911,
              "reviewCount": 1947
          },
          {
              "name": "2 Star",
              "starCount": 1947,
              "reviewCount": 9124
          },
          {
              "name": "3 Star",
              "starCount": 9124,
              "reviewCount": 6984
          },
          {
              "name": "4 Star",
              "starCount": 6984,
              "reviewCount": 8488
          },
          {
              "name": "5 Star",
              "starCount": 8488,
              "reviewCount": 2034
          }
      ],
      "reviews": [
          {
              "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
              "name": "Jayvion Simon",
              "postedAt": "2023-07-04T05:32:35.369Z",
              "comment": "The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.",
              "isPurchased": true,
              "rating": 4.2,
              "avatarUrl": "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg",
              "helpful": 9911,
              "attachments": []
          },
          {
              "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
              "name": "Lucian Obrien",
              "postedAt": "2023-07-03T04:32:35.369Z",
              "comment": "She eagerly opened the gift, her eyes sparkling with excitement.",
              "isPurchased": true,
              "rating": 3.7,
              "avatarUrl": "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg",
              "helpful": 1947,
              "attachments": [
                  "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg"
              ]
          },
          {
              "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
              "name": "Deja Brady",
              "postedAt": "2023-07-02T03:32:35.369Z",
              "comment": "The old oak tree stood tall and majestic, its branches swaying gently in the breeze.",
              "isPurchased": true,
              "rating": 4.5,
              "avatarUrl": "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg",
              "helpful": 9124,
              "attachments": []
          },
          {
              "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
              "name": "Harrison Stein",
              "postedAt": "2023-07-01T02:32:35.369Z",
              "comment": "The aroma of freshly brewed coffee filled the air, awakening my senses.",
              "isPurchased": false,
              "rating": 3.5,
              "avatarUrl": "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg",
              "helpful": 6984,
              "attachments": [
                  "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_3.jpg",
                  "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_4.jpg"
              ]
          },
          {
              "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",
              "name": "Reece Chung",
              "postedAt": "2023-06-30T01:32:35.369Z",
              "comment": "The children giggled with joy as they ran through the sprinklers on a hot summer day.",
              "isPurchased": false,
              "rating": 0.5,
              "avatarUrl": "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg",
              "helpful": 8488,
              "attachments": []
          },
          {
              "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
              "name": "Lainey Davidson",
              "postedAt": "2023-06-29T00:32:35.369Z",
              "comment": "He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.",
              "isPurchased": true,
              "rating": 3,
              "avatarUrl": "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg",
              "helpful": 2034,
              "attachments": [
                  "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_6.jpg",
                  "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_7.jpg",
                  "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_8.jpg"
              ]
          },
          {
              "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
              "name": "Cristopher Cardenas",
              "postedAt": "2023-06-27T23:32:35.369Z",
              "comment": "The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.",
              "isPurchased": false,
              "rating": 2.5,
              "avatarUrl": "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg",
              "helpful": 3364,
              "attachments": []
          },
          {
              "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
              "name": "Melanie Noble",
              "postedAt": "2023-06-26T22:32:35.369Z",
              "comment": "The waves crashed against the shore, creating a soothing symphony of sound.",
              "isPurchased": false,
              "rating": 2.8,
              "avatarUrl": "https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg",
              "helpful": 8401,
              "attachments": []
          }
      ],
      "tags": [
          "Technology",
          "Marketing",
          "Design",
          "Photography",
          "Art"
      ],
      "code": "38BEE271",
      "description": "\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n",
      "newLabel": {
          "enabled": true,
          "content": "NEW"
      },
      "sku": "WW75K5211YW/SV",
      "createdAt": "2023-07-03T04:32:35.370Z",
      "saleLabel": {
          "enabled": false,
          "content": "SALE"
      },
      "name": "Foundations Matte Flip Flop",
      "price": 97.14,
      "coverUrl": "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_2.jpg",
      "totalRatings": 3.7,
      "totalSold": 684,
      "totalReviews": 9124,
      "subDescription": "Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.",
      "colors": [
          "#000000",
          "#FFFFFF"
      ]
  }

  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('description');

  const [publish, setPublish] = useState('');

  const { checkout, onAddCart, onGotoStep } = useCheckout();

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
          editLink={paths.dashboard.product.edit(`${product?.id}`)}
          liveLink={paths.product.details(`${product?.id}`)}
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
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
              <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
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
              label: 'Description',
            },
            {
              value: 'inventories',
              label: `Inventories`,
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

          {currentTab === 'description' && (
              <ProductDetailsDescription description={product?.description}/>
          )}

        {currentTab === 'inventories' && (
          <ProductDetailsReview
            ratings={product.ratings}
            reviews={product.reviews}
            totalRatings={product.totalRatings}
            totalReviews={product.totalReviews}
          />
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
