import { lazy } from 'react'

const CancelledProducts = lazy(() => import('../../views/transaction/productCancel'))

const ProductRoutes = [  
  {
    element: <CancelledProducts />,
    path: '/product/cancelledproducts'
  }

]

export default ProductRoutes
