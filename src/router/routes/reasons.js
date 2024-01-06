import { lazy } from 'react'

const Reasons = lazy(() => import('../../views/transaction/Reasons'))

const reasonRoutes = [
  {
    element: <Reasons />,
    path: '/transaction/reasons'
  }

]

export default reasonRoutes