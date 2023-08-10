import {useMemo} from 'react'
// routes
import {paths} from '../../routes/paths'
// locales
import useLocales from '../../locales/use-locales'
// components
import SvgColor from '../../components/svg-color'
//api
import {getUserByEmail} from "../../api/user"

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
)

const ICONS = {
  user: icon('ic_user'),
  order: icon('ic_order'),
  product: icon('ic_product'),
  sales: icon('ic_sales'),
  dashboard: icon('ic_dashboard')
}

const currentUser = sessionStorage.getItem('currentUser'),
    user = currentUser ? await getUserByEmail(JSON.parse(currentUser)?.email) : {}

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales()

  const items = [

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

    // SALES
    {
      title: t('sales'),
      path: paths.dashboard.sales.root,
      icon: ICONS.sales,
      children: [
        {title: t('point'), path: paths.dashboard.sales.point}
      ],
    }
  ]

  // USER
  if(user?.role==="Admin"){
    items.push({
      title: t('user'),
      path: paths.dashboard.user.root,
      icon: ICONS.user,
      children: [
        { title: t('list'), path: paths.dashboard.user.list },
        { title: t('create'), path: paths.dashboard.user.new },
        { title: t('account'), path: paths.dashboard.user.account }
      ]
    })
  }

  return useMemo(
      () => [
        // MANAGEMENT
        // ----------------------------------------------------------------------
        {
          subheader: t('management'),
          items
        }
      ],
      [t]
  );
}
