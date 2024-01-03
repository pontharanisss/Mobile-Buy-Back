import { lazy } from 'react'

const Designation = lazy(() => import('../../views/employee/designation'))
const Department = lazy(() => import('../../views/employee/department'))
const Employee = lazy(() => import('../../views/employee/employee'))

const EmployeeRoutes = [
  {
    path: '/employee/designation',
    element: <Designation />
  },
  {
    path: '/employee/department',
    element: <Department />
  },
  {
    path: '/employee/employee',
    element: <Employee />
  }
]

export default EmployeeRoutes
