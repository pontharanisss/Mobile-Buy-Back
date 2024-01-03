import { lazy } from 'react'


const Company = lazy(() => import('../../views/masters/companyMaster'))

const User = lazy(() => import('../../views/masters/usermanagement'))


const MastersRoutes = [

  {
    path: '/masters/companyMaster',
    element: <Company />
  }, 
  {
    path: '/masters/usermanagement',
    element: <User />
  }
 
]

export default MastersRoutes
