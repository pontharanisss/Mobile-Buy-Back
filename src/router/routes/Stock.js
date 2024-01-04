import { lazy } from 'react'

const Stock = lazy(() => import('../../views/transaction/stock'))

const StockRoutes = [
  {
    element: <Stock />,
    path: '/transaction/stock'
  }

]

export default StockRoutes
