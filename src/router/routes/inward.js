import { lazy } from 'react'

const Inward = lazy(() => import('../../views/transaction/inward'))
const PriceChange = lazy(() => import('../../views/transaction/priceChange'))


const InwardRoutes = [
  {
    element: <Inward />,
    path: '/transaction/inward'
  },
  {
    element: <PriceChange />,
    path: '/transaction/priceChange'
  }


]

export default InwardRoutes
