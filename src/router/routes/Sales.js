import { lazy } from 'react'

const Sales = lazy(() => import('../../views/transaction/sales'))

const SalesRoutes = [
  {
    element: <Sales />,
    path: '/transaction/sales'
  }

]

export default SalesRoutes
