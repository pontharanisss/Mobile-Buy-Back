import { lazy } from 'react'

const UserMaster = lazy(() => import('../../views/masters/userMaster'))

const MasterRoutes = [  
  {
    element: <UserMaster />,
    path: '/masters/userMaster'
  }

]

export default MasterRoutes
