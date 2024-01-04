import { lazy } from 'react'

const Import = lazy(() => import('../../views/process/import'))
const Process = lazy(() => import('../../views/process'))

const FormRoutes = [
  {
    element: <Process />,
    path: '/process'
  },
  {
    element: <Import />,
    path: '/process/import'
  }
 
]

export default FormRoutes
