import { lazy } from 'react'

const Inward = lazy(() => import('../../views/transaction/inward'))

const InwardRoutes = [
  {
    element: <Inward />,
    path: '/transaction/inward'
  }

]

export default InwardRoutes
