// ** React Imports
import { Navigate } from 'react-router-dom'
import { Suspense } from 'react'

// // ** Context Imports
// import { AbilityContext } from '@src/utility/context/Can'

const PrivateRoute = ({ children, route }) => {
  // // ** Hooks & Vars
  // const ability = useContext(AbilityContext)
  // const user = JSON.parse(localStorage.getItem('userData'))

  if (route) {
    if (route.meta) {
      action = route.meta.action
      resource = route.meta.resource
      restrictedRoute = route.meta.restricted
    }
    
    // if (!user) {
      // return <Navigate to='/login' />
    // }
  }

  return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
