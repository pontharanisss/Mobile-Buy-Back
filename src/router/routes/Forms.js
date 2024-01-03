import { lazy } from 'react'

const Import = lazy(() => import('../../views/process/import'))

const FormRoutes = [
  {
    element: <Import />,
    path: '/process/import'
  }
 
]

export default FormRoutes
