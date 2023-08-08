import {useMemo} from 'react'
// routes
import {paths} from '../../routes/paths'
// locales
import useLocales from '../../locales/use-locales'
// components
import SvgColor from '../../components/svg-color'

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
)

const ICONS = {
  user: icon('ic_user'),
  order: icon('ic_order'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  sales: icon('ic_sales'),
  dashboard: icon('ic_dashboard')
}

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  return useMemo(
      () => [
        // MANAGEMENT
        // ----------------------------------------------------------------------
        {
          subheader: t('management'),
          items: [

            // PRODUCT
            {
              title: t('product'),
              path: paths.dashboard.product.root,
              icon: ICONS.product,
              children: [
                {title: t('list'), path: paths.dashboard.product.root}
              ],
            },

            // ORDER
            {
              title: t('order'),
              path: paths.dashboard.order.root,
              icon: ICONS.order,
              children: [
                {title: t('list'), path: paths.dashboard.order.root}
              ],
            },

            // INVOICE
            {
              title: t('invoice'),
              path: paths.dashboard.invoice.root,
              icon: ICONS.invoice,
              children: [
                {title: t('list'), path: paths.dashboard.invoice.root},
                {title: t('create'), path: paths.dashboard.invoice.new}
              ],
            },

            // SALES
            {
              title: t('sales'),
              path: paths.dashboard.sales.root,
              icon: ICONS.sales,
              children: [
                {title: t('point'), path: paths.dashboard.sales.point}
              ],
            },

            // USER
            {
              title: t('user'),
              path: paths.dashboard.user.root,
              icon: ICONS.user,
              children: [
                { title: t('list'), path: paths.dashboard.user.list },
                { title: t('create'), path: paths.dashboard.user.new },
                { title: t('account'), path: paths.dashboard.user.account }
              ],
            },
          ]
        }
      ],
      [t]
  );
}
