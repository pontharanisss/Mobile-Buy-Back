import { lazy } from 'react'

const Sales = lazy(() => import('../../views/transaction/sales'))
const AddSales = lazy(() => import('../../views/transaction/sales/AddInvoice'))
const CancelledProducts = lazy(() => import('../../views/transaction/productCancel'))

const SalesRoutes = [
  {
    element: <Sales />,
    path: '/transaction/sales'
  },
  {
    element: <AddSales />,
    path: '/transaction/sales/add'
  }
  
]

export default SalesRoutes
