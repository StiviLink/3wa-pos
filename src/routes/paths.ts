// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
}

// ----------------------------------------------------------------------

export const paths = {
  page403: '/403',
  page404: '/404',
  page500: '/500',
  product: {
    root: `/product`
  },
  sales: {
    root: `/sales`,
    payment: `/sales/payment`,
    invoice: `/sales/invoice`
  },
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      details: (id: string) => `${ROOTS.DASHBOARD}/product/${id}`
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id: string) => `${ROOTS.DASHBOARD}/order/${id}`
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`
    },
    sales: {
      root: `${ROOTS.DASHBOARD}/sales`,
      point: `${ROOTS.DASHBOARD}/sales/point`
    }
  }
}
