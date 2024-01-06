import { lazy } from 'react'

const Import = lazy(() => import('../../views/process/import'))
const Process = lazy(() => import('../../views/process'))
const TransactionDetails = lazy(() => import('../../views/process/viewTransaction'))

const FormRoutes = [
  {
    element: <Process />,
    path: '/process'
  },
  {
    element: <Import />,
    path: '/process/import'
  },
  {
    element: <TransactionDetails />,
    path: '/process/viewTransactiondetails'
  }
]

export default FormRoutes
